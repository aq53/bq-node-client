function getDataset(datasetId = 'test') {
  // [START bigquery_get_dataset]
  // Import the Google Cloud client library
  const { BigQuery } = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  async function getDataset() {
    // Retrieves dataset named "my_dataset".

    /**
     * TODO(developer): Uncomment the following lines before running the sample
     */
    // const datasetId = "my_dataset";

    // Retrieve dataset reference
    const [dataset] = await bigquery.dataset(datasetId).get();

    console.log('Dataset:');
    console.log(dataset.metadata.datasetReference);
  }
  getDataset();
  // [END bigquery_get_dataset]
}

function createDataset(datasetId = 'my_new_dataset') {
  // [START bigquery_create_dataset]
  // Import the Google Cloud client library and create a client
  const { BigQuery } = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  async function createDataset() {
    // Creates a new dataset named "my_dataset".

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const datasetId = "my_new_dataset";

    // Specify the geographic location where the dataset should reside
    const options = {
      location: 'US',
    };

    // Create a new dataset
    const [dataset] = await bigquery.createDataset(datasetId, options);
    console.log(`Dataset ${dataset.id} created.`);
  }
  createDataset();
  // [END bigquery_create_dataset]
}

function insertRows(datasetId = 'my_new_dataset', tableId = 'my_table') {
  // [START bigquery_table_insert_rows]
  // Import the Google Cloud client library
  const { BigQuery } = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  async function insertRowsAsStream() {
    // Inserts the JSON objects into my_dataset:my_table.

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const datasetId = 'my_dataset';
    // const tableId = 'my_table';
    const rows = [
      { name: 'Tom', age: 30 },
      { name: 'Jane', age: 32 },
    ];
    const tables = await listTables();
    if (!tables || !tables.includes(tableId)) {
      await createTable(datasetId, tableId)
    }
    // Insert data into a table
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(rows);
    console.log(`Inserted ${rows.length} rows`);
  }
  // [END bigquery_table_insert_rows]
  insertRowsAsStream();
}

async function listTables(datasetId = 'my_new_dataset') {
  // [START bigquery_list_tables]
  // Import the Google Cloud client library
  const { BigQuery } = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  async function listTables() {
    // Lists tables in 'my_dataset'.

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const datasetId = 'my_dataset';

    // List all tables in the dataset
    const [tables] = await bigquery.dataset(datasetId).getTables();

    console.log('Tables:');
    tables.forEach(table => console.log(table.id));
    return tables;
  }
  // [END bigquery_list_tables]
  return listTables();
}

function createTable(
  datasetId = 'my_dataset', // Existing dataset
  tableId = 'my_new_table', // Table to be created
  schema = [
    { name: 'Name', type: 'STRING', mode: 'REQUIRED' },
    { name: 'Age', type: 'INTEGER' },
    { name: 'Weight', type: 'FLOAT' },
    { name: 'IsMagic', type: 'BOOLEAN' },
  ]
) {
  // [START bigquery_create_table]
  // Import the Google Cloud client library and create a client
  const { BigQuery } = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  async function createTable() {
    // Creates a new table named "my_table" in "my_dataset".

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const datasetId = "my_dataset";
    // const tableId = "my_table";
    // const schema = 'Name:string, Age:integer, Weight:float, IsMagic:boolean';

    // For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
    const options = {
      schema: schema,
      location: 'US',
    };

    // Create a new table in the dataset
    const [table] = await bigquery
      .dataset(datasetId)
      .createTable(tableId);

    console.log(`Table ${table.id} created.`);
  }
  // [END bigquery_create_table]
  createTable();
}

insertRows(...process.argv.slice(2));
