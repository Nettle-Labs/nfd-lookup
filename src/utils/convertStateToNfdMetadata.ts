import { decodeUint64, encodeAddress } from 'algosdk';

// Types
import { INfdMetadata, ITealKeyValue, IUtilityOptions } from '../types';

// Utils
import isStringPrintable from './isStringPrintable';
import parseAddressesFromBytes from './parseAddressesFromBytes';

export default function convertStateToNfdMetadata(
  appState: ITealKeyValue[],
  options: IUtilityOptions
): INfdMetadata {
  // keys must be sorted to ensure proper ordering of decoding (v.caAlgo.0.as, v.caAlgo.1.as, .. for eg)
  const sortedAppState: ITealKeyValue[] = appState.sort(
    ({ key: aKey }, { key: bKey }) => {
      const decodedAKey: Buffer = Buffer.from(aKey, 'base64');
      const decodedBKey: Buffer = Buffer.from(bKey, 'base64');

      return Buffer.compare(decodedAKey, decodedBKey);
    }
  );
  const metadata: Record<'internal' | 'userDefined' | 'verified', any> = {
    internal: {},
    userDefined: {},
    verified: {},
  };
  let addresses: string[] = [];
  let decodedKey: string;
  let decodedValueBytes: Buffer;
  let parsedAddresses: string[] | null;
  let value: string | null = null;

  for (const keyValue of sortedAppState) {
    decodedKey = Buffer.from(keyValue.key, 'base64').toString();

    switch (keyValue.value.type) {
      case 1: // bytes
        decodedValueBytes = Buffer.from(keyValue.value.bytes, 'base64');

        if (decodedKey.endsWith('.as')) {
          // caAlgo.#.as (sets of packed algorand addresses)
          parsedAddresses = parseAddressesFromBytes(decodedValueBytes, options);
          if (!parsedAddresses) {
            break;
          }

          addresses = [...addresses, ...parsedAddresses];

          // don't set into the state map - just collect the addresses and we set them into a single caAlgo field at the end, as a comma-delimited string.
          continue;
        }

        if (decodedValueBytes.length === 32 && decodedKey.endsWith('.a')) {
          // 32 bytes and key name has '.a' [algorand address] suffix
          value = encodeAddress(decodedValueBytes);
          decodedKey = decodedKey.substring(0, decodedKey.indexOf('.a')); // strip suffix

          break;
        }

        // we can assume it is a big-endian integer
        if (
          decodedValueBytes.length === 8 &&
          !isStringPrintable(decodedValueBytes)
        ) {
          value = decodeUint64(decodedValueBytes, 'bigint').toString(10);

          break;
        }

        value = decodedValueBytes.toString();

        break;
      case 2: // uint
        value = keyValue.value.uint.toString(10);

        break;
      default:
        value = 'unknown';

        break;
    }

    switch (decodedKey.slice(0, 2)) {
      case 'i.':
        metadata.internal = {
          ...metadata.internal,
          ...(value && {
            [decodedKey.slice(2)]: value,
          }),
        };

        break;
      case 'u.':
        metadata.userDefined = {
          ...metadata.userDefined,
          ...(value && {
            [decodedKey.slice(2)]: value,
          }),
        };

        break;
      case 'v.':
        metadata.verified = {
          ...metadata.verified,
          ...(value && {
            [decodedKey.slice(2)]: value,
          }),
        };

        break;
      default:
        break;
    }
  }

  if (addresses.length > 0) {
    metadata.verified['caAlgo'] = addresses.join(',');
  }

  return {
    internal: metadata.internal,
    verified: metadata.verified,
    userDefined: metadata.userDefined,
  };
}
