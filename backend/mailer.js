import { defaults } from "request-promise";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  port: 25,
  host: "http://localhost:8000",
  tls: {
    rejectUnauthorized: false,
  },
});

let message = {
    from: "noreply@domain.com",
    to: "kurumikawamura@gmail.com"
}