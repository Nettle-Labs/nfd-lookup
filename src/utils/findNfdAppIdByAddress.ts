import { decodeUint64, LogicSig } from 'algosdk';

// Types
import {
  ILookupNfDomainByAddressOptions,
  ITealKeyValue,
  IUtilityOptions,
} from '../types';

// Utils
import { resolveLogicSigFromAddress } from '../utils';

export default async function findNfdAppIdByAddress({
  address,
  algodClient,
  logger,
  registryAppId,
}: Omit<ILookupNfDomainByAddressOptions, 'debug'> & IUtilityOptions): Promise<
  bigint | null
> {
  const logicSig: LogicSig = resolveLogicSigFromAddress({
    address,
    logger,
    registryAppId,
  });
  const appIds: bigint[] = [];
  let accountInformation: Record<string, any>;
  let appId: bigint;
  let decodedKey: string;
  let decodedValueBytes: Buffer;
  let appLocalState: ITealKeyValue[];

  try {
    accountInformation = await algodClient
      .accountApplicationInformation(logicSig.address(), Number(registryAppId))
      .do();
    appLocalState = accountInformation['app-local-state']['key-value'];
  } catch (error) {
    logger.error(error);

    return null;
  }

  if (!appLocalState) {
    return null;
  }

  appLocalState.forEach((keyValue) => {
    decodedKey = Buffer.from(keyValue.key, 'base64').toString();

    // find the registry app in the local state of the account
    if (decodedKey === 'i.apps0') {
      if (keyValue.value.type === 1) {
        decodedValueBytes = Buffer.from(keyValue.value.bytes, 'base64');

        // ensure the byte data is a multiple of 8
        if (decodedValueBytes.length % 8 === 0) {
          for (let i = 0; i < decodedValueBytes.length; i += 8) {
            appId = decodeUint64(
              decodedValueBytes.subarray(i, i + 8),
              'bigint'
            );

            if (appId !== BigInt(0)) {
              appIds.push(appId);
            }
          }
        }
      }
    }
  });

  return appIds[0] || null;
}
