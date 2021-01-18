const nodemailer = require("nodemailer"); //importing node mailer
const { email, password } = require("../../utils");
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

module.exports = transport;
