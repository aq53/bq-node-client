const bigquery = require("../config/bq");
const { camelize, returnDataType, datasetId } = require("../utils");

async function createTable(tableId, row) {
  const schema = [
    {
      name: "postId",
      type: "STRING",
    },
    {
      name: "postDate",
      type: "DATETIME",
    },
  ];
  for (let key in row) {
    console.log("KEY::", key, typeof key);
    // if (returnDataType(typeof row[key]) !== "RECORD") {
    schema.push({
      name: camelize(key),
      type: returnDataType(typeof row[key]),
    });
    // }
  }
  const options = {
    schema: schema,
    location: "US",
  };

  console.log("SCHEMA", schema);
  const [table] = await bigquery
    .dataset(datasetId)
    .createTable(tableId, options);
  console.log(`Table ${table.id} is created.`);
}

module.exports = createTable;
