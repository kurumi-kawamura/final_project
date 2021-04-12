const { MongoClient, ObjectID } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require("bcrypt");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addingUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { name, password } = req.body;
  try {
    await client.connect();

    const db = client.db();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { _id: name, password: hashedPassword };

    const result = await db.collection("account").insertOne(user);
    assert.equal(1, result.insertedCount);
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res.status(404).json({ status: 400, msg: err.message });
    console.log(err.stack);
  }
  client.close();
};

const getAll = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db();
  const result = await db.collection("items").find().toArray();

  if (result.length) {
    res.status(200).json({ status: 200, data: result });
  } else {
    res.status(404).json({ status: 404, msg: "Not found" });
  }

  client.close();
};

const getItemById = async (req, res) => {
  const { _id } = req.params;
  const client = await MongoClient(MONGO_URI, options);
  const id = Number(_id);
  console.log(id);

  await client.connect();
  console.log("connected");

  const db = client.db();

  const result = db.collection("items").findOne({ _id: id });
  if (result) {
    const final = await result;
    res.status(200).json({ status: 200, data: final });
  } else {
    res.status(404).json({ status: 404, id, msg: "Not found" });
  }

  client.close();
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db();
  const result = await db.collection("account").find().toArray();

  if (result.length) {
    res.status(200).json({ status: 200, data: result });
  } else {
    res.status(404).json({ status: 404, msg: "No users yet" });
  }

  client.close();
};

const login = async (req, res) => {
  const { name, password } = req.body;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db();

  const result = db.collection("account").findOne({ _id: name });
  if (result) {
    const final = await result;
    if (await bcrypt.compare(password, final.password)) {
      res.status(200).json({ status: 200, msg: "sucess", data: final });
    } else {
      res.status(404).json({ status: 404, data: "Not allowed" });
    }
  } else {
    res.status(404).json({ status: 404, data: "Not found" });
  }

  client.close();
};

const updateStock = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { quantity, _id } = req.body;
  const query = { _id };
  const newValue = { $set: { stock: stock - quantity } };

  try {
    await client.connect();

    const db = client.db();
    const result = await db.collection("items").updateOne(query, newValue);
    assert.equal(1, result.matchedCount);
    assert.equal(1, result.modifiedCount);
    res.status(200).json({ status: 200, msg: "success" });
  } catch (err) {
    res.status(404).json({ status: 404, msg: err.message });
    console.log(err.stack);
  }

  client.close();
};

// const updateInventory = (req, res) => {
//   const { id, num } = req.body;
//   let newArr = [];
//   data.find((item) => {
//     for (let i = 0; i < id.length; i++) {
//       if (item._id === Number(id[i])) {
//         newArr.push(item);
//       }
//     }
//   });
//   if (newArr.length > 0) {
//     for (let j = 0; j < newArr.length; j++) {
//       for (let l = 0; l < num.length; l++) {
//         if (j === l) {
//           newArr[j].numInStock = newArr[j].numInStock - num[l];
//         }
//       }
//     }

//     res.status(200).json({ status: 200, success: true });
//   }
// };

const getAllMossInfo = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db();
  const result = await db.collection("moss").find().toArray();

  if (result.length) {
    res.status(200).json({ status: 200, data: result });
  } else {
    res.status(404).json({ status: 404, msg: "Not found" });
  }

  client.close();
};

module.exports = {
  addingUser,
  getAll,
  getItemById,
  getUsers,
  login,
  getAllMossInfo,
  updateStock,
};
