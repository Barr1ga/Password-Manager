const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const vault = db.collection("vaults");
const User = db.collection("Users");

const LIMIT_QUERY = 1;

const getAllMembers = asyncHandler(async (req, res) => {
  const { uid } = req.body;

  let membersUids = [];
  const members = await (
    await vault.doc(uid).collection("members").get()
  ).docs.map((doc) => {
    membersUids = [...membersUids, doc.id];
    return { ...doc.data(), uid: doc.id };
  });

  const membersData = await (
    await User.where(
      admin.firestore.FieldPath.documentId(),
      "in",
      membersUids
    ).get()
  ).docs.map((doc) => {
    const { email, username, image, viewing, status } = doc.data();
    const uid = doc.id;
    const roleUids = members.find((member) => member.uid === uid).roleUids;
    return { email, username, image, viewing, status, roleUids, uid };
  });

  res.status(201).json(membersData);
});

const createMember = asyncHandler(async (req, res) => {
  // const { uid, memberData } = req.body;

  // const result = await vault.doc(uid).collection("members").add(memberData);

  // if (result.empty) {
  //   res.status(400);
  //   throw new Error("There was an error creating this member!");
  // }

  // const createdMemberUid = result.id;

  // const member = await (
  //   await vault.doc(uid).collection("members").doc(createdMemberUid).get()
  // ).data();

  // if (member.empty) {
  //   res.status(400);
  //   throw new Error("There was an error finding the created member!");
  // }

  res.status(201).json(member);
});

const updateMember = asyncHandler(async (req, res) => {
  // const { uid, memberUid, memberData } = req.body;
  // console.log("memberUid", memberUid);

  // const result = await vault.doc(uid)
  //   .collection("members")
  //   .doc(memberUid)
  //   .update(memberData);

  // if (result.empty) {
  //   res.status(400);
  //   throw new Error("There was an error updating this member!");
  // }

  // const member = await (
  //   await vault.doc(uid).collection("members").doc(memberUid).get()
  // ).data();

  // if (member.empty) {
  //   res.status(400);
  //   throw new Error("There was an error finding the created member!");
  // }

  // member.uid = memberUid;
  // console.log(member);
  res.status(201).json(member);
});

const deleteMember = asyncHandler(async (req, res) => {
  // const { uid, memberUid } = req.body;
  // console.log("memberUid", memberUid);
  // const result = await vault.doc(uid).collection("members").doc(memberUid).delete();
  // if (result.empty) {
  //   res.status(400);
  //   throw new Error("There was an error deleting this member!");
  // }
  // res.status(201).json(memberUid);
});

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
};
