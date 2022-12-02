/**
 * Checks whether or not a file has a specific file extension
 * @param {string} fileName The name of the file
 * @param {string[]} allowedExts An array of allowed file extensions
 * @returns Whether or not the file is of a certain extension type
 */
const hasFileExt = (fileName, allowedExts) => {
  // Retrieve the file extension from the file name
  const fileExt = fileName.toLowerCase().split('.').at(-1);

  // Check if the file extension exists in the array of allowed extensions
  if (allowedExts.includes(fileExt)) {
    // The file extension is allowed
    // Return the file type
    return fileExt;
  }

  // The file extension is not allowed
  return null;
};

export default hasFileExt;
