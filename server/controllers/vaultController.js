const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const vault = db.collection("vaults");
const User = db.collection("Users");

const LIMIT_QUERY = 1;

// const getAllvaults = asyncHandler(async (req, res) => {
//   const { uid } = req.body;
//   const members = await (
//     await vault.doc(uid).collection("members").get()
//   ).docs.map((doc) => {
//     return { ...doc.data(), uid: doc.id };
//   });

//   res.status(201).json(members);
// });


// const updatevault = asyncHandler(async (req, res) => {
//   const { uid, memberUid, memberData } = req.body;
//   console.log("memberUid", memberUid);

//   const result = await vault.doc(uid)
//     .collection("members")
//     .doc(memberUid)
//     .update(memberData);

//   if (result.empty) {
//     res.status(400);
//     throw new Error("There was an error updating this member!");
//   }

//   const member = await (
//     await vault.doc(uid).collection("members").doc(memberUid).get()
//   ).data();

//   if (member.empty) {
//     res.status(400);
//     throw new Error("There was an error finding the created member!");
//   }

//   member.uid = memberUid;
//   console.log(member);
//   res.status(201).json(member);
// });

// const deletevault = asyncHandler(async (req, res) => {
//   const { uid, memberUid } = req.body;
//   console.log("memberUid", memberUid);
//   const result = await vault.doc(uid)
//     .collection("members")
//     .doc(memberUid)
//     .delete();

//   if (result.empty) {
//     res.status(400);
//     throw new Error("There was an error deleting this member!");
//   }

//   res.status(201).json(memberUid);
// });

module.exports = {
  // getAllvaults,
  // updatevault,
  // deletevault,
};
