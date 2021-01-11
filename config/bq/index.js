const path = require("path");

const { BigQuery } = require("@google-cloud/bigquery");
console.log(process.env.PROJECT_ID);
const bigquery = new BigQuery({
  projectId: "",
  keyFilename: path.join(__dirname, "/gcpKeyFile.json"),
});

module.exports = bigquery;
