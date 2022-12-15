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

const updateMemberRoles = asyncHandler(async (req, res) => {
  const { vaultUid, userUid, roleUids } = req.body;

  const updateMemberRoles = await vault
    .doc(vaultUid)
    .collection("members")
    .doc(userUid)
    .update({ roleUids });

  if (updateMemberRoles.empty) {
    res.status(400);
    throw new Error("There was an error finding the created role!");
  }

  res.status(201).json({ userUid, roleUids });
});

const kickMember = asyncHandler(async (req, res) => {
  const { vaultUid, memberUid } = req.body;

  const kick = await vault
    .doc(vaultUid)
    .collection("members")
    .doc(memberUid)
    .delete();

  if (kick.empty) {
    res.status(400);
    throw new Error("There was an error kicking this member!");
  }

  const member = await User.doc(memberUid).get();

  if (member.empty) {
    res.status(400);
    throw new Error("There was an error creating this notification!");
  }

  const memberData = member.data();
  // new vaults
  const newVaults = memberData.vaults.filter((vault) => vault !== vaultUid);

  const updateUser = User.doc(memberUid).update({ vaults: newVaults });

  if (updateUser.empty) {
    res.status(400);
    throw new Error("There was an error updating this user!");
  }

  res.status(201).json({ memberUid });
});

const assignMultipleMemberRole = asyncHandler(async (req, res) => {
  const { uid, roleUid, assignedMembers } = req.body;

  assignedMembers.forEach((member) => {
    vault
      .doc(uid)
      .collection("members")
      .doc(member)
      .set(
        {
          roleUids: admin.firestore.FieldValue.arrayUnion(roleUid),
        },
        { merge: true }
      );
  });

  res.status(201).json({ roleUid, assignedMembers });
});

const unAssignMultipleMemberRole = asyncHandler(async (req, res) => {
  const { uid, roleUid, unAssignedMembers } = req.body;
  console.log(unAssignedMembers)
  unAssignedMembers.forEach((member) => {
    vault
      .doc(uid)
      .collection("members")
      .doc(member)
      .set(
        {
          roleUids: admin.firestore.FieldValue.arrayRemove(roleUid),
        },
        { merge: true }
      );
  });

  res.status(201).json({ roleUid, unAssignedMembers });
});

module.exports = {
  getAllMembers,
  updateMemberRoles,
  assignMultipleMemberRole,
  unAssignMultipleMemberRole,
  kickMember,
};
