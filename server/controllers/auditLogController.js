const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const User = db.collection("Users");

const LIMIT_QUERY = 1;

const getAllLogs = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const itemLogs = await (
    await User.doc(uid).collection("auditLogs").get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(itemLogs);
});

const createItemLog = asyncHandler(async (req, res) => {
  const { uid, itemLogData } = req.body;

  const result = await User.doc(uid).collection("auditLogs").add(itemLogData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error creating this item log!");
  }

  const createdItemLogUid = result.id;
  console.log(uid);

  const itemLog = await (
    await User.doc(uid).collection("auditLogs").doc(createdItemLogUid).get()
  ).data();

  if (itemLog.empty) {
    res.status(400);
    throw new Error("There was an error finding the created item log!");
  }

  res.status(201).json(itemLog);
});

const updateItemLog = asyncHandler(async (req, res) => {
  const { uid, itemLogUid, itemLogData } = req.body;
  console.log("itemLogUid", itemLogUid);

  const result = await User.doc(uid)
    .collection("auditLogs")
    .doc(itemLogUid)
    .update(itemLogData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error updating this item log!");
  }

  const itemLog = await (
    await User.doc(uid).collection("auditLogs").doc(itemLogUid).get()
  ).data();

  if (itemLog.empty) {
    res.status(400);
    throw new Error("There was an error finding the created item log!");
  }

  itemLog.uid = itemLogUid;
  console.log(itemLog);
  res.status(201).json(itemLog);
});

const deleteItemLog = asyncHandler(async (req, res) => {
  const { uid, itemLogUid } = req.body;
  console.log("itemLogUid", itemLogUid);
  const result = await User.doc(uid).collection("auditLogs").doc(itemLogUid).delete();

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error deleting this item log!");
  }

  res.status(201).json(itemLogUid);
});

module.exports = {
  getAllLogs,
  createItemLog,
  updateItemLog,
  deleteItemLog,
};
