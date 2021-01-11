const bigquery = require("../config/bq");
const { datasetId } = require("../utils");
// const createTable = require("./createTable");

async function listTables() {
  console.log("ds id::", datasetId);
  let [tables] = await bigquery.dataset(datasetId).getTables();
  console.log("Tables:");
  tables = tables.map((table) => table.id);
  return tables;
}

module.exports = { listTables };
