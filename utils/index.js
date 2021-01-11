const returnDataType = (type) => {
  switch (type) {
    case "string":
      return "STRING";
    case "number":
      return "FLOAT";
    case "boolean":
      return "BOOLEAN";
    default:
      return "STRING";
  }
};
const camelize = (str) => {
  return str
    .trim() //might need polyfill if you need to support older browsers
    .toLowerCase() //lower case everything
    .replace(
      /([^A-Z0-9]+)(.)/gi, //match multiple non-letter/numbers followed by any character
      function (match) {
        return arguments[2].toUpperCase(); //3rd index is the character we need to transform uppercase
      }
    );
};
const datasetId = "survey";

module.exports = {
  camelize,
  datasetId,
  returnDataType,
};
