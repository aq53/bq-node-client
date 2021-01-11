const bigquery = require("../config/bq");
const { camelize, returnDataType, datasetId } = require("../utils");

async function updateSchema(tableId, row) {
  // Retrieve current table metadata
  const newRow = { ...row };
  const table = bigquery.dataset(datasetId).table(tableId);
  const [metadata] = await table.getMetadata();

  // Update table schema
  const schema = metadata.schema;
  const new_schema = schema;
  const isFieldExists = (filedName) =>
    schema.fields.find((field) => field.name === filedName);

  //   new_schema.fields.push(column);
  //   metadata.schema = new_schema;
  console.log("NEW_SCHEMA::", new_schema);
  for (let key in newRow) {
    console.log("KEY::", key, typeof key);
    if (isFieldExists(camelize(key))) {
      delete newRow[key];
    } else {
      // if (returnDataType(typeof newRow[key]) !== "RECORD") {
      new_schema.fields.push({
        name: camelize(key),
        type: returnDataType(typeof newRow[key]),
      });
      // }
    }
  }

  if (Object.keys(newRow).length) {
    metadata.schema = new_schema;
    const [result] = await table.setMetadata(metadata);
    console.log("RESULT", result.schema.fields);
  }
}

module.exports = updateSchema;
