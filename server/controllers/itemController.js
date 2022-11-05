const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const vault = db.collection("vaults");

const LIMIT_QUERY = 1;

const getAllItems = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const items = await (
    await vault.doc(uid).collection("items").get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(items);
});

const getFavorites = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const items = await (
    await vault.doc(uid).collection("items").where("favorite", "==", true).get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(items);
});

const getTrash = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const items = await (
    await vault.doc(uid).collection("items").where("trash", "==", true).get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(items);
});

const getTypeSpecific = asyncHandler(async (req, res) => {
  const { uid, type } = req.body;
  const items = await (
    await vault.doc(uid).collection("items").where("type", "==", type).get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(items);
});

const getFolderSpecific = asyncHandler(async (req, res) => {
  const { uid, folder } = req.body;
  const items = await (
    await vault.doc(uid)
      .collection("items")
      .where("folders", "array-contains", folder)
      .get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(items);
});

const createItem = asyncHandler(async (req, res) => {
  const { uid, itemData } = req.body;

  const result = await vault.doc(uid).collection("items").add(itemData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error creating this item!");
  }

  const createdItemUid = result.id;
  console.log(uid);

  const item = await (
    await vault.doc(uid).collection("items").doc(createdItemUid).get()
  ).data();

  if (item.empty) {
    res.status(400);
    throw new Error("There was an error finding the created item!");
  }

  res.status(201).json(item);
});

const updateItem = asyncHandler(async (req, res) => {
  const { uid, itemUid, itemData } = req.body;

  const result = await vault.doc(uid)
    .collection("items")
    .doc(itemUid)
    .update(itemData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error updating this item!");
  }

  const item = await (
    await vault.doc(uid).collection("items").doc(itemUid).get()
  ).data();

  if (item.empty) {
    res.status(400);
    throw new Error("There was an error finding the created item!");
  }

  item.uid = itemUid;
  console.log(item);
  res.status(201).json(item);
});

const deleteItem = asyncHandler(async (req, res) => {
  const { uid, itemUid } = req.body;
  console.log("itemUid", itemUid);
  const result = await vault.doc(uid).collection("items").doc(itemUid).delete();

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error deleting this item!");
  }

  res.status(201).json(itemUid);
});

module.exports = {
  getAllItems,
  getFavorites,
  getTrash,
  getTypeSpecific,
  getFolderSpecific,
  createItem,
  updateItem,
  deleteItem,
};
