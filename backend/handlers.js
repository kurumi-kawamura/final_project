const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");
const { changeAddress } = require("./apiHandlers");

require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require("bcrypt");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addingUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { name, password, email } = req.body;
  try {
    await client.connect();

    const db = client.db();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      _id: name,
      userName: name,
      password: hashedPassword,
      email: email,
    };

    const result = await db.collection("account").insertOne(user);
    assert.equal(1, result.insertedCount);
    res.status(200).json({ status: 200, data: user });
  } catch (err) {
    res.status(404).json({ status: 400, msg: err.message });
    console.log(err.stack);
  }
  client.close();
};

const addRequest = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { name, location, src, submittedBy } = req.body;
  try {
    await client.connect();

    const db = client.db();
    const latLng = await changeAddress(location);
    const moss = {
      name: name,
      location: location,
      latitude: latLng.lat,
      longitude: latLng.lng,
      imgSrc: src,
      submittedBy: submittedBy,
    };

    const result = await db.collection("request").insertOne(moss);
    assert.equal(1, result.insertedCount);
    res.status(200).json({ status: 200, data: moss });
  } catch (err) {
    res.status(404).json({ status: 400, msg: err.message });
    console.log(err.stack);
  }
  client.close();
};

const getRequest = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db();
  const result = await db.collection("request").find().toArray();

  if (result.length) {
    res.status(200).json({ status: 200, data: result });
  } else {
    res.status(404).json({ status: 404, msg: "Not found" });
  }

  client.close();
};

const addNewMoss = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { name, location, src, submittedBy, _id } = req.body;
  try {
    await client.connect();

    const db = client.db();
    const latLng = await changeAddress(location);
    const moss = {
      name: name,
      location: location,
      latitude: latLng.lat,
      longitude: latLng.lng,
      imgSrc: src,
      submittedBy: submittedBy,
    };

    const result = await db.collection("moss").insertOne(moss);
    assert.equal(1, result.insertedCount);
    const result2 = await db
      .collection("request")
      .deleteOne({ _id: ObjectId(_id) });
    assert.equal(1, result2.deletedCount);
    res.status(200).json({ status: 200, data: moss });
  } catch (err) {
    res.status(404).json({ status: 400, msg: err.message });
    console.log(err.stack);
  }
  client.close();
};

const AddComment = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { msg, by, _id } = req.body;
  try {
    await client.connect();

    const db = client.db();
    const comment = {
      msg: msg,
      by: by,
    };

    const result = await db
      .collection("moss")
      .updateOne({ _id: ObjectId(_id) }, { $push: { comments: comment } });

    assert.equal(1, result.matchedCount);
    assert.equal(1, result.modifiedCount);
    res.status(200).json({ status: 200, data: comment });
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

  await client.connect();

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

const updatePassword = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { username, newPass } = req.body;
  try {
    await client.connect();
    
    const hashedPassword = await bcrypt.hash(newPass, 10);
    const newValue = { $set: { password: hashedPassword } };

    const db = client.db();
    const result = await db
      .collection("account")
      .updateOne({ _id: username }, newValue);
    assert.equal(1, result.matchedCount);
    assert.equal(1, result.modifiedCount);
    res.status(200).json({ status: 200, msg: "success", data: result });
  } catch (err) {
    res.status(404).json({ status: 404, msg: err.message });
    console.log(err.stack);
  }
  client.close();
};

const updateStock = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { quantity, _id, stock } = req.body;
  let newArr = [];
  for (let i = 0; i < _id.length; i++) {
    for (let j = 0; j < quantity.length; j++) {
      for (let l = 0; l < stock.length; l++) {
        if (i === j && j === l) {
          newArr.push({ _id: _id[i], quantity: quantity[j], stock: stock[l] });
        }
      }
    }
  }

  try {
    await client.connect();

    const db = client.db();
    let result;
    for (let k = 0; k < newArr.length; k++) {
      const newValue = {
        $set: { stock: Number(newArr[k].stock) - Number(newArr[k].quantity) },
      };
      result = await db
        .collection("items")
        .updateOne({ _id: newArr[k]._id }, newValue);
    }
    assert.equal(1, result.matchedCount);
    assert.equal(1, result.modifiedCount);
    res.status(200).json({ status: 200, msg: "success", data: result });
  } catch (err) {
    res.status(404).json({ status: 404, msg: err.message });
    console.log(err.stack);
  }

  client.close();
};

const AddStock = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { quantity, _id, stock } = req.body;
  let newArr = [];
  for (let i = 0; i < _id.length; i++) {
    for (let j = 0; j < quantity.length; j++) {
      for (let l = 0; l < stock.length; l++) {
        if (i === j && j === l) {
          newArr.push({ _id: _id[i], quantity: quantity[j], stock: stock[l] });
        }
      }
    }
  }

  try {
    await client.connect();

    const db = client.db();
    let result;
    for (let k = 0; k < newArr.length; k++) {
      const newValue = {
        $set: { stock: Number(newArr[k].stock) + Number(newArr[k].quantity) },
      };
      result = await db
        .collection("items")
        .updateOne({ _id: newArr[k]._id }, newValue);
    }
    assert.equal(1, result.matchedCount);
    assert.equal(1, result.modifiedCount);
    res.status(200).json({ status: 200, msg: "success", data: result });
  } catch (err) {
    res.status(404).json({ status: 404, msg: err.message });
    console.log(err.stack);
  }

  client.close();
};

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
  addNewMoss,
  AddComment,
  addRequest,
  getRequest,
  AddStock,
  updatePassword,
};
