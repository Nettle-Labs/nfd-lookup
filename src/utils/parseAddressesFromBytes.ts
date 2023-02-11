import { encodeAddress, isValidAddress } from 'algosdk';

// Types
import { IUtilityOptions } from '../types';

export default function parseAddressesFromBytes(
  data: Buffer,
  { logger }: IUtilityOptions
): string[] | null {
  let addresses: string[] = [];
  let encodedAddress: string;
  let rawAddress: Uint8Array;

  if (data.byteLength % 32 !== 0) {
    logger.error(
      `parseAddressesFromBytes(): data length of ${data.byteLength} is not a multiple of 32`
    );

    return null;
  }

  for (let offset = 0; offset < data.byteLength; offset += 32) {
    rawAddress = data.subarray(offset, offset + 32);
    encodedAddress = encodeAddress(rawAddress);

    // if the address is all zeroes or the address is not valid, ignore
    if (
      rawAddress.every((value) => value === 0) ||
      isValidAddress(encodedAddress)
    ) {
      continue;
    }

    addresses.push(encodedAddress);
  }

  return addresses;
}
