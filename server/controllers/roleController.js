const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const vault = db.collection("vaults");
const User = db.collection("Users");

const LIMIT_QUERY = 1;

const getAllRoles = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  const roles = await (
    await vault.doc(uid).collection("roles").get()
  ).docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  res.status(201).json(roles);
});

const createRole = asyncHandler(async (req, res) => {
  // const { uid, roleData } = req.body;

  // const result = await vault.doc(uid).collection("roles").add(roleData);

  // if (result.empty) {
  //   res.status(400);
  //   throw new Error("There was an error creating this role!");
  // }

  // const createdRoleUid = result.id;

  // const role = await (
  //   await vault.doc(uid).collection("roles").doc(createdRoleUid).get()
  // ).data();

  // if (role.empty) {
  //   res.status(400);
  //   throw new Error("There was an error finding the created role!");
  // }

  res.status(201).json(role);
});

const updateRole = asyncHandler(async (req, res) => {
  // const { uid, roleUid, roleData } = req.body;
  // console.log("roleUid", roleUid);

  // const result = await vault.doc(uid)
  //   .collection("roles")
  //   .doc(roleUid)
  //   .update(roleData);

  // if (result.empty) {
  //   res.status(400);
  //   throw new Error("There was an error updating this role!");
  // }

  // const role = await (
  //   await vault.doc(uid).collection("roles").doc(roleUid).get()
  // ).data();

  // if (role.empty) {
  //   res.status(400);
  //   throw new Error("There was an error finding the created role!");
  // }

  // role.uid = roleUid;
  // console.log(role);
  res.status(201).json(role);
});

const deleteRole = asyncHandler(async (req, res) => {
  // const { uid, roleUid } = req.body;
  // console.log("roleUid", roleUid);
  // const result = await vault.doc(uid).collection("roles").doc(roleUid).delete();
  // if (result.empty) {
  //   res.status(400);
  //   throw new Error("There was an error deleting this role!");
  // }
  // res.status(201).json(roleUid);
});

module.exports = {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
};
