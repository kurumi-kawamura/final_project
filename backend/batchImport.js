const fs = require("file-system");
const assert = require("assert");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const items = JSON.parse(fs.readFileSync("./data.json"));

const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("sucess")

    const db = client.db();

    const result = await db.collection("items").insertMany(items);

    assert.equal(items.length, result.insertedCount);
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

// batchImport();

const mosInfos = JSON.parse(fs.readFileSync("./mossData.json"));

const mossInfoImport = async () => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("sucess")
    const db = client.db();

    const result = await db.collection("moss").insertMany(mosInfos);

    assert.equal(mosInfos.length, result.insertedCount);
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

mossInfoImport();
