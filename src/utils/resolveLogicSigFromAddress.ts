import { bigIntToBytes, LogicSig } from 'algosdk';

// Types
import { IUtilityOptions } from '../types';

export default function resolveLogicSigFromAddress(
  address: string,
  registryAppId: bigint,
  { logger }: IUtilityOptions
): LogicSig {
  /*
		#pragma version 5
		intcblock 1
		pushbytes 0x0102030405060708
		btoi
		store 0
		txn ApplicationID
		load 0
		==
		txn TypeEnum
		pushint 6
		==
		&&
		txn OnCompletion
		intc_0 // 1
		==
		txn OnCompletion
		pushint 0
		==
		||
		&&
		bnz label1
		err
		label1:
		intc_0 // 1
		return
		bytecblock "xxx"
	*/
  const contractByteCode: Uint8Array = new Uint8Array([
    0x05,
    0x20,
    0x01,
    0x01,
    0x80,
    0x08,
    0x01,
    0x02,
    0x03,
    0x04,
    0x05,
    0x06,
    0x07,
    0x08, // 0x01-0x08 are placeholders reserved for the registry app id
    0x17,
    0x35,
    0x00,
    0x31,
    0x18,
    0x34,
    0x00,
    0x12,
    0x31,
    0x10,
    0x81,
    0x06,
    0x12,
    0x10,
    0x31,
    0x19,
    0x22,
    0x12,
    0x31,
    0x19,
    0x81,
    0x00,
    0x12,
    0x11,
    0x10,
    0x40,
    0x00,
    0x01,
    0x00,
    0x22,
    0x43,
    0x26,
    0x01, // the bytecblock opcode
  ]);
  const lookUpBytes: Uint8Array = new TextEncoder().encode(
    `address/${address}`
  );
  const logicSig: LogicSig = new LogicSig(
    new Uint8Array([
      ...contractByteCode.subarray(0, 6),
      ...bigIntToBytes(registryAppId, 8), // bytes 6-13 [0-index] with 0x01-0x08 placeholders is where we put the registry contract app id bytes in big-endian
      ...contractByteCode.subarray(14),
      ...new Uint8Array([lookUpBytes.byteLength]), // write the uvarint length of our lookup bytes
      ...lookUpBytes, // append the bytes of the prefix + lookup to the end in a bytecblock chunk; the 0x26 0x01 at end of sigLookupByteCode
    ])
  );

  logger.debug(
    `resolveLogicSigFromAddress(): resolved logic sig account "${logicSig.address()}" for address "${address}"`
  );

  return logicSig;
}
