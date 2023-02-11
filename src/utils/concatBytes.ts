/**
 * Convenience function for iterating over an array of bytes and concating them all into a single set of bytes
 * @param {Uint8Array[]} bytesArray - an array of bytes.
 * @returns {Uint8Array} the array of bytes concatenated.
 */
export default function concatBytes(bytesArray: Uint8Array[]): Uint8Array {
  const mergedBytesArray: Uint8Array = new Uint8Array(
    bytesArray.reduce((acc, value) => acc + value.length, 0)
  );
  let offset: number = 0;

  bytesArray.forEach((value) => {
    mergedBytesArray.set(value, offset);
    offset += value.length;
  });

  return mergedBytesArray;
}
