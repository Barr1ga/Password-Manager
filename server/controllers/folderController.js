const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const vault = db.collection("vaults");
const User = db.collection("Users");

const LIMIT_QUERY = 1;

const getAllFolders = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const folder = await (
    await vault.doc(uid).collection("folder").get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(folder);
});

const createFolder = asyncHandler(async (req, res) => {
  const { uid, folderData } = req.body;

  const result = await vault.doc(uid).collection("folder").add(folderData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error creating this folder!");
  }

  const createdFolderUid = result.id;

  const folder = await (
    await vault.doc(uid).collection("folder").doc(createdFolderUid).get()
  ).data();

  if (folder.empty) {
    res.status(400);
    throw new Error("There was an error finding the created folder!");
  }

  folder.uid = createdFolderUid;

  res.status(201).json(folder);
});

const updateFolder = asyncHandler(async (req, res) => {
  const { uid, folderUid, folderData } = req.body;

  const result = await vault.doc(uid)
    .collection("folder")
    .doc(folderUid)
    .update(folderData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error updating this folder!");
  }

  const folder = await (
    await vault.doc(uid).collection("folder").doc(folderUid).get()
  ).data();

  if (folder.empty) {
    res.status(400);
    throw new Error("There was an error finding the created folder!");
  }

  folder.uid = folderUid;

  res.status(201).json(folder);
});

const deleteFolder = asyncHandler(async (req, res) => {
  const { uid, folderUid } = req.body;
  
  const result = await vault.doc(uid).collection("folder").doc(folderUid).delete();

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error deleting this folder!");
  }
  res.status(201).json(folderUid);
});

module.exports = {
  getAllFolders,
  createFolder,
  updateFolder,
  deleteFolder,
};
