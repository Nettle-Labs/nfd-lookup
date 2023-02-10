/**
 * ONLY NFDomains can currently set verified properties.
 * @property {string} [key: string] - [optional] caAlgo.0.as/caAlgo.1.as, etc. Contains packed 32-byte PKs of Algorand addresses which were verified by the owner as an address they can sign for.
 * @property {string} avatar - [optional] link to verified avatar - typically ipfs:// link
 * @property {string} avatarasaid - [optional] the ASA ID of the avatar.
 * @property {string} banner - [optional] link to verified banner - typically ipfs:// link
 * @property {string} bannerasaid - [optional] the ASA ID of the banner.
 * @property {string} domain - [optional] DNS Zone that was verified
 * @property {string} discord - [optional] Discord snowflake ID that was verified
 * @property {string} telegram - [optional] Telegram @handle that was verified
 * @property {string} twitter - [optional] Twitter user id that was verified.
 */
interface INfdVerifiedMetadata {
  [key: string]: string;
  avatar?: string;
  avatarasaid?: string;
  banner?: string;
  bannerasaid?: string;
  domain?: string;
  discord?: string;
  telegram?: string;
  twitter?: string;
}

export default INfdVerifiedMetadata;
