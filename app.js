const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  upload,
  getListFiles,
  download,
} = require("./controller/file.controller");
const { create, get } = require("./controller/survey.controller");
const router = express.Router();
const app = express();
const PORT = 5000;

global.__basedir = __dirname;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.post("/insertRows", create);
app.get("/getRow/:tableId", get);
router.post("/upload", upload);
router.get("/files", getListFiles);
router.get("/files/:name", download);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
