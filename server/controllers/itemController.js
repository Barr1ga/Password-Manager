const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const User = db.collection("Users");

const LIMIT_QUERY = 1;

const getAllItems = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const items = await (
    await User.doc(uid).collection("items").get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(items);
});

const getFavorites = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const items = await (
    await User.doc(uid).collection("items").where("favorite", "==", true).get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(items);
});

const getTrash = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const items = await (
    await User.doc(uid).collection("items").where("trash", "==", true).get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(items);
});

const getTypeSpecific = asyncHandler(async (req, res) => {
  const { uid, type } = req.body;
  const items = await (
    await User.doc(uid).collection("items").where("type", "==", type).get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(items);
});

const getFolderSpecific = asyncHandler(async (req, res) => {
  const { uid, folder } = req.body;
  const items = await (
    await User.doc(uid).collection("items").where("folders", "array-contains", folder).get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
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

  const createdItemUid = result.id;
  console.log(uid);

  const item = await (
    await User.doc(uid).collection("items").doc(createdItemUid).get()
  ).data();

  if (item.empty) {
    res.status(400);
    throw new Error("There was an error finding the created item!");
  }

  res.status(201).json(item);
});

module.exports = {
  getAllItems,
  getFavorites,
  getTrash,
  getTypeSpecific,
  getFolderSpecific,
  createItem,
};
