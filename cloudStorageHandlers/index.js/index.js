const storage = require("../../config/gcp/storage");
const { bucketName } = require("../../utils");
const path = require("path");

async function uploadFileToCloudStorage(files) {
  const filePath = __basedir + "/uploads/";
  for (let i = 0; i < files.length; i++) {
    await storage
      .bucket(bucketName)
      .upload(path.join(filePath, files[i].originalname), {
        gzip: true,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });
  }

  console.log(`uploaded to ${bucketName}.`);
}

// [END storage_upload_file]

module.exports = uploadFileToCloudStorage;
