const { projectId } = require("../config/gcp/bq");
const bigquery = require("../config/gcp/bq");
const { datasetId } = require("../utils");

async function getRow(postId) {
  const tableId = "hal_validation_sum";
  const dataset = await bigquery.dataset(datasetId);
  const destinationTable = await dataset.table(tableId);

  const query = `SELECT * FROM \`${projectId}.survey.${tableId}\` WHERE postId="${postId}"`;

  console.log({ projectId, postId, query, destinationTable });

  const options = {
    query: query,
    location: "US",
  };

  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  const [rows] = await job.getQueryResults();
  return rows[0];
}
module.exports = getRow;
