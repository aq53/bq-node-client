const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const insertRow = require("../bqHandlers/insertRow");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/insertRows", (req, res) => {
  const row = req.body.data;
  const tableId = req.body.tableId;
  console.log("REQUEST", req.body);
  insertRow(tableId, row)
    .then((dataset) => {
      console.log("dataset", dataset);
      res.status(200).send({ msg: "Insert successfull!" });
    })
    .catch((err) => {
      console.log("ERROR:::::", err);
      res
        .status(400)
        .send({ msg: (err && err.message) || "Something went wrong!" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
