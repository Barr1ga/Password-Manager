const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const vault = db.collection("vaults");

const LIMIT_QUERY = 1;

const getAllLogs = asyncHandler(async (req, res) => {
  const { uid } = req.body;

  const itemLogs = await (
    await vault
      .doc(uid)
      .collection("auditLogs")
      .orderBy("date", "desc")
      .get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(itemLogs);
});

const createLog = asyncHandler(async (req, res) => {
  const { uid, auditLogData } = req.body;

  auditLogData.date = new Date();

  const result = await vault.doc(uid).collection("auditLogs").add(auditLogData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error creating this item log!");
  }

  const createdLogUid = result.id;

  const log = await (
    await vault.doc(uid).collection("auditLogs").doc(createdLogUid).get()
  ).data();

  if (log.empty) {
    res.status(400);
    throw new Error("There was an error finding the created item log!");
  }

  res.status(201).json(log);
});

// const deleteItemLog = asyncHandler(async (req, res) => {
//   const { uid, itemLogUid } = req.body;
//   console.log("itemLogUid", itemLogUid);
//   const result = await vault
//     .doc(uid)
//     .collection("auditLogs")
//     .doc(itemLogUid)
//     .delete();

//   if (result.empty) {
//     res.status(400);
//     throw new Error("There was an error deleting this item log!");
//   }

//   res.status(201).json(itemLogUid);
// });

module.exports = {
  getAllLogs,
  createLog,
};
