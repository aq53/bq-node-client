const bigquery = require("../config/bq");
const { camelize, datasetId } = require("../utils");
const createTable = require("./createTable");
const { listTables } = require("./listTables");
const updateSchema = require("./updateSchema");
const uuid = require("uuid").v4;

async function insertIntoRelationTable(tableRow) {
  const coCreation = tableRow["coCreation"];
  const secondaryEffects = tableRow["secondaryEffects"].toLowerCase();
  const gtmStrategy = tableRow["gtmStrategy"].toLowerCase();
  const geographicalMarkets = JSON.parse(
    tableRow["geographicalMarkets"].toLowerCase()
  );
  const fundraisingRound = tableRow["fundraisingRound"].toLowerCase();
  const salesRevenueLastMonth = tableRow["salesRevenueLastMonth"];
  const row1 = {
    postId: tableRow.postId,
    statusText: "Co Creation",
    statusValue: coCreation ? 1 : 0,
  };
  const row2 = {
    postId: tableRow.postId,
    statusText: "Secondary Effects",
    statusValue: secondaryEffects === "yes" ? 1 : 0,
  };
  const row3 = {
    postId: tableRow.postId,
    statusText: "GTM strategy",
    statusValue: gtmStrategy.includes("network") ? 1 : 0,
  };
  const row4 = {
    postId: tableRow.postId,
    statusText: "Geo",
    statusValue:
      geographicalMarkets.includes("south east asia") ||
      geographicalMarkets.includes("asia pacific")
        ? 1
        : 0,
  };
  const row5 = {
    postId: tableRow.postId,
    statusText: "Stage",
    statusValue:
      fundraisingRound === "pre-seed" ||
      fundraisingRound === "seed" ||
      fundraisingRound === "bridge round" ||
      fundraisingRound === "series a"
        ? 1
        : 0,
  };
  const row6 = {
    postId: tableRow.postId,
    statusText: "Revenue",
    statusValue: salesRevenueLastMonth ? 1 : 0,
  };

  await bigquery
    .dataset(datasetId)
    .table("hal_data_validation")
    .insert([row1, row2, row3, row4, row5, row6]);
}

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
        await insertIntoRelationTable(tableRow);
        resolve({ data: row, tableId });
      } catch (err) {
        console.log("INSERT ROW::", err);
        reject(err);
      }
    }, 5000);
  });
}

module.exports = insertRow;
