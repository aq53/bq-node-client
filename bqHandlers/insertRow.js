const bigquery = require("../config/bq");
const { camelize, datasetId } = require("../utils");
const createTable = require("./createTable");
const { listTables } = require("./listTables");
const updateSchema = require("./updateSchema");
const uuid = require("uuid").v4;

function insertRow(tableId, row) {
  return new Promise(async (resolve, reject) => {
    const tables = await listTables();
    if (tables.includes(tableId)) {
      try {
        await updateSchema(tableId, row);
      } catch (err) {
        reject(err);
        console.log("Update Schema ERR::", err);
      }
    } else {
      try {
        await createTable(tableId, row);
      } catch (err) {
        reject(err);
        console.log("Create Table ERR::", err);
      }
    }

    setTimeout(async () => {
      try {
        const tableRow = {
          postId: uuid(),
          postDate: bigquery.datetime(new Date().toISOString()),
        };
        for (let key in row) {
          if (typeof row[key] === "object") {
            console.log(typeof row[key], key);
            tableRow[camelize(key)] = JSON.stringify(row[key]);
          } else {
            tableRow[camelize(key)] = row[key];
          }
        }
        await bigquery.dataset(datasetId).table(tableId).insert([tableRow]);
        resolve({ data: row, tableId });
      } catch (err) {
        console.log("INSERT ROW::", err);
        reject(err);
      }
    }, 5000);
  });
}

module.exports = insertRow;
