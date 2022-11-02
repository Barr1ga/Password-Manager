const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const User = db.collection("Users");

const LIMIT_QUERY = 1;

const getAllItems = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const items = await (
    await User.doc(uid).collection("items").get()
  ).docs.map((doc) => {
    return {...doc.data(), uid: doc.id};
  });

  res.status(201).json(items);
});

const createItem = asyncHandler(async (req, res) => {
  const { uid, itemData } = req.body;

  const result = await User.doc(uid).collection("items").add(itemData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error creating this item!");
  }

  res.status(201).json(result);
});

module.exports = {
  getAllItems,
  createItem,
};
