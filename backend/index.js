"use strict";

const express = require("express");
const morgan = require("morgan");
const { addingUser } = require("./handlers");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(bodyParser.json())

  .post("/createAcc", addingUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
