"use strict";

const stripe = require("stripe")(
  "sk_test_51IgXFuKRpDc8HQiOpLXOpLzzs2qEQMi79MOdx5i8Pcq1OcfXDePDCcUsSxbvthplObsGJ2jIUiTNkVxJZKsS7M0T00TkJ0aBKB"
);
const express = require("express");
const morgan = require("morgan");
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

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(bodyParser.json())

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
