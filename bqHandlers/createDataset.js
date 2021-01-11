const bigquery = require("../config/bq");

async function createDataset(datasetId = "my_new_dataset") {
  const options = {
    location: "US",
  };

  // Create a new dataset
  const [dataset] = await bigquery.createDataset(datasetId, options);
  console.log(`Dataset ${dataset.id} created.`);
}
createDataset(...process.argv.slice(2));
module.exports = { createDataset };
