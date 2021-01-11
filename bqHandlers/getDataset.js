const bigquery = require("../config/bq");
const { datasetId } = require("../utils");
async function getDataset() {
  const [dataset] = await bigquery.dataset(datasetId).get();
  console.log("Dataset:");
  console.log(dataset.metadata.datasetReference);
  return dataset.metadata.datasetReference;
}

module.exports = getDataset;
