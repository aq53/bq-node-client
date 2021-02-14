const path = require("path");

const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery({
  projectId: "grand-strand-300313",
  keyFilename: path.join(__dirname, "/gcpKeyFile.json"),
});

module.exports = bigquery;
