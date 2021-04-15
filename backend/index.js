"use strict";

const stripe = require("stripe")(
  "sk_test_51IgXFuKRpDc8HQiOpLXOpLzzs2qEQMi79MOdx5i8Pcq1OcfXDePDCcUsSxbvthplObsGJ2jIUiTNkVxJZKsS7M0T00TkJ0aBKB"
);
const express = require("express");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  addingUser,
  getAll,
  getUsers,
  getItemById,
  getAllMossInfo,
  login,
  addNewMoss,
  updateStock,
} = require("./handlers");

require("dotenv").config();
const { USER, PASS } = process.env;

const PORT = 8000;

const transport = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: USER,
    pass: PASS,
  },
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take message");
  }
});

router.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  let content = `name: ${name} \n email: ${email} \n message: ${message}`;

  let mail = {
    from: name,
    to: "kawamura@shin-eng.com",
    subject: "New Message from Contact us",
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

express()
  .use(cors())
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use("/", router)

  .get("/items", getAll)
  .get("/items/:_id", getItemById)
  .get("/moss", getAllMossInfo)
  .post("/createAcc", addingUser)
  .post("/users/login", login)
  .get("/users", getUsers)
  .post("/addNewMoss", addNewMoss)
  .post("/updateStock", updateStock)
  .post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.json({ id: session.id });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
