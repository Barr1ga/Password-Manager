const asyncHandler = require("express-async-handler");
const {
  default: VaultRoles,
} = require("../../client/src/components/members/VaultRoles");
const { db, admin } = require("../util/admin");
const vault = db.collection("vaults");

const LIMIT_QUERY = 1;

const getAllItems = asyncHandler(async (req, res) => {
  const { uid, authorizedFolders, isUserOwner } = req.body;

  var items = [];

  if (isUserOwner) {
    items = await (
      await vault.doc(uid).collection("items").where("trash", "==", false).get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  } else {
    items = await (
      await vault
        .doc(uid)
        .collection("items")
        .where("folders", "array-contains-any", authorizedFolders)
        .where("trash", "==", false)
        .get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  }

  res.status(201).json(items);
});

const getFavorites = asyncHandler(async (req, res) => {
  const { uid, authorizedFolders, isUserOwner } = req.body;

  var items = [];

  if (isUserOwner) {
    const items = await (
      await vault
        .doc(uid)
        .collection("items")
        .where("favorite", "==", true)
        .where("trash", "==", false)
        .get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  } else {
    const items = await (
      await vault
        .doc(uid)
        .collection("items")
        .where("folders", "array-contains-any", authorizedFolders)
        .where("favorite", "==", true)
        .where("trash", "==", false)
        .get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  }

  res.status(201).json(items);
});

const getTrash = asyncHandler(async (req, res) => {
  const { uid, authorizedFolders, isUserOwner } = req.body;

  var items = [];

  if (isUserOwner) {
    const items = await (
      await vault.doc(uid).collection("items").where("trash", "==", true).get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  } else {
    const items = await (
      await vault
        .doc(uid)
        .collection("items")
        .where("folders", "array-contains-any", authorizedFolders)
        .where("trash", "==", true)
        .get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  }

  res.status(201).json(items);
});

const getTypeSpecific = asyncHandler(async (req, res) => {
  const { uid, type, authorizedFolders, isUserOwner } = req.body;

  var items = [];

  if (isUserOwner) {
    const items = await (
      await vault
        .doc(uid)
        .collection("items")
        .where("type", "==", type)
        .where("trash", "==", false)
        .get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  } else {
    const items = await (
      await vault
        .doc(uid)
        .collection("items")
        .where("folders", "array-contains-any", authorizedFolders)
        .where("type", "==", type)
        .where("trash", "==", false)
        .get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  }

  res.status(201).json(items);
});

const getFolderSpecific = asyncHandler(async (req, res) => {
  const { uid, folder, isUserOwner } = req.body;

  var items = [];

  if (isUserOwner) {
    const items = await (
      await vault.doc(uid).collection("items").where("trash", "==", false).get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  } else {
    const items = await (
      await vault
        .doc(uid)
        .collection("items")
        .where("folders", "array-contains", folder)
        .where("trash", "==", false)
        .get()
    ).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id };
    });
  }

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

  let item = await (
    await vault.doc(uid).collection("items").doc(createdItemUid).get()
  ).data();

  if (item.empty) {
    res.status(400);
    throw new Error("There was an error finding the created item!");
  }

  item.uid = createdItemUid;

  res.status(201).json(item);
});

const updateItem = asyncHandler(async (req, res) => {
  const { uid, itemUid, itemData } = req.body;

  const result = await vault
    .doc(uid)
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

  res.status(201).json(item);
});

const deleteItem = asyncHandler(async (req, res) => {
  const { uid, itemUid } = req.body;

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
