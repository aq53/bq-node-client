const storage = require("../../config/gcp/storage");
const { bucketName } = require("../../utils");
const path = require("path");

async function uploadFileToCloudStorage(filename) {
  const filePath = __basedir + "/resources/static/assets/uploads/";

  await storage.bucket(bucketName).upload(path.join(filePath, filename), {
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  console.log(`${filename} uploaded to ${bucketName}.`);
}

// [END storage_upload_file]

module.exports = uploadFileToCloudStorage;
