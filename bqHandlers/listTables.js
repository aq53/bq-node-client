const bigquery = require("../config/gcp/bq");
const { datasetId } = require("../utils");
// const createTable = require("./createTable");

async function listTables() {
  let [tables] = await bigquery.dataset(datasetId).getTables();
  console.log("Tables:");
  tables = tables.map((table) => table.id);
  return tables;
}

module.exports = { listTables };
