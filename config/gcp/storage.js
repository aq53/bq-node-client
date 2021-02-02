const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage({
  projectId: "grand-strand-300313",
  keyFilename: path.join(__dirname, "../bq/gcpKeyFile.json"),
});

module.exports = storage;
