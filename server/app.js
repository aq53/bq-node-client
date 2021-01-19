const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const insertRow = require("../bqHandlers/insertRow");
const { email } = require("../utils");
const transporter = require("../config/nodemailer");
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/insertRows", (req, res) => {
  const row = req.body.data;
  const tableId = req.body.tableId;
  insertRow(tableId, row)
    .then(async (dataset) => {
      const reportUrl =
        "https://datastudio.google.com/u/0/reporting/7801f3bf-c3e4-4aaa-aa5b-f69ff0e76706/page/ULCxB";
      const emailParams = {
        email: dataset.data.email,
      };
      const paramsAsString = JSON.stringify(emailParams);
      const encodedParams = encodeURIComponent(paramsAsString);

      var mailOptions = {
        from: email, //replace with your email
        to: emailParams.email, //replace with your email
        subject: ``,
        html: `<h1>Hello, please find report link below</h1>
<p> Report: ${reportUrl}?params=${encodedParams}</p><br>`,
      };

      await transporter.sendMail(mailOptions);
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
