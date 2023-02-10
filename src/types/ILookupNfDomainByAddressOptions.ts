import { Algodv2 } from 'algosdk';

// Types
import ILogLevel from './ILogLevel';

/**
 * Various options needed to get the NFDomain metadata from the chain.
 * @property {Algodv2} algodClient - an inttialized Algod client that will be used to query the chain.
 * @property {ILogLevel} debug - [optional] whether logs will be printed to console.
 * @property {bigint} registryAppId - the app ID for the NFDomain you want to lookup. NOTE: you must use the correct
 * registry that matches the client chain connection.
 * @see {@link https://api-docs.nf.domains/reference/on-chain-reference/registry-application-ids} for which registry to
 * choose.
 */
interface ILookupNfDomainByAddressOptions {
  algodClient: Algodv2;
  debug?: ILogLevel;
  registryAppId: bigint;
}

export default ILookupNfDomainByAddressOptions;
