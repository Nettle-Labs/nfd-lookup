/**
 * Convenience function that checks if the supplied byte data is a valid UTF-8 string.
 * @param {Uint8Array} data - the bytes to check.
 * @returns {boolean} true if the decoded bytes are a valid UTF-8 string, false otherwise.
 */
export default function isStringPrintable(data: Uint8Array): boolean {
  try {
    new TextDecoder('utf8', { fatal: true }).decode(data, {});
  } catch (error) {
    return false;
  }

  return true;
}
