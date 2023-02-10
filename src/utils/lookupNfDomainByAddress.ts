// Types
import {
  ILogger,
  ILookupNfDomainByAddressOptions,
  INfdMetadata,
} from '../types';

// Utils
import convertStateToNfdMetadata from './convertStateToNfdMetadata';
import createLogger from './createLogger';
import findNfdAppIdByAddress from './findNfdAppIdByAddress';

/**
 * Takes an Algorand address (public key) and an NFDomain registry app ID to do an on-chain lookup which will get the NFDomain
 * metadata associated with the address.
 *
 * If no NFDomain is found, or an error is encountered, null is returned.
 * @param {string} address - the Algorand address (public key) to lookup.
 * @param {ILookupNfDomainByAddressOptions} options - various options needed to lookup the NFDomain metadata.
 * @returns {INfdMetadata | null} the NFDomain metadata, or null if an error is encountered or the address does not have
 * an NFDomain associated with it.
 */
export default async function lookupNfDomainByAddress(
  address: string,
  { algodClient, debug, ...otherOptions }: ILookupNfDomainByAddressOptions
): Promise<INfdMetadata | null> {
  const logger: ILogger = createLogger(debug || 'silent');
  const nfdAppId: bigint | null = await findNfdAppIdByAddress(address, {
    algodClient,
    logger,
    ...otherOptions,
  });
  let application: Record<string, any>;

  if (!nfdAppId) {
    return null;
  }

  logger.debug(
    'lookupNfDomainByAddress(): found nfd app id: ',
    nfdAppId.toString()
  );

  try {
    application = await algodClient.getApplicationByID(Number(nfdAppId)).do();
  } catch (error) {
    logger.error(error);

    return null;
  }

  return convertStateToNfdMetadata(application.params['global-state'], {
    logger,
  });
}
