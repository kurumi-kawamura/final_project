"use strict";

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

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
