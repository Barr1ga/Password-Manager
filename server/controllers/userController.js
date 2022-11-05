const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const User = db.collection("Users");
const vault = db.collection("vaults");

// const getAllUser = asyncHandler(async (req, res) => {
//   const user = await User.get();
//   User.onSnapshot((snapshot) => {
//     console.log("this is a test");
//     snapshot.docs.map((doc) => {
//       console.log(doc.data());
//     });
//   });
// });

const updateUserEmail = asyncHandler(async (req, res) => {
  const { uid, email } = req.body;
  const result = await User.doc(uid).update({
    email,
  });

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error updating this user!");
  }

  const updatedDocument = await User.doc(uid).get();

  if (updatedDocument.empty) {
    res.status(400);
    throw new Error("User not found!");
  }

  const updatedUsername = updatedDocument.data().email;

  res.status(201).json(updatedUsername);
});

const updateUserData = asyncHandler(async (req, res) => {
  const { uid, username } = req.body;
  const result = await User.doc(uid).update({
    username,
  });

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error updating this user!");
  }

  const updatedDocument = await User.doc(uid).get();

  if (updatedDocument.empty) {
    res.status(400);
    throw new Error("User not found!");
  }

  const updatedUsername = updatedDocument.data().username;

  res.status(201).json(updatedUsername);
});

const updateUserPasswordHint = asyncHandler(async (req, res) => {
  const { uid, masterPasswordHint } = req.body;
  const result = await User.doc(uid).update({
    masterPasswordHint,
  });

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error updating this user!");
  }

  const updatedDocument = await User.doc(uid).get();

  if (updatedDocument.empty) {
    res.status(400);
    throw new Error("User not found!");
  }

  const updatedPasswordHint = updatedDocument.data().masterPasswordHint;

  res.status(201).json(updatedPasswordHint);
});

const getUserData = asyncHandler(async (req, res) => {
  const { data } = req.body;
  const result = await User.doc(data).get();
  if (result.empty) {
    res.status(400);
    throw new Error("User not found!");
  }

  res.status(200).json(result.data());
});

const getMasterPasswordHint = asyncHandler(async (req, res) => {
  const { data } = req.body;
  const result = await User.where("email", "==", data).get();

  if (result.empty) {
    res.status(400);
    throw new Error("User not found!");
  }

  let hint;
  result.forEach((doc) => {
    hint = doc.data().masterPasswordHint;
  });

  res.status(200).json(hint);
});

const createUser = asyncHandler(async (req, res) => {
  const { uid, username, masterPasswordHint, image, email } = req.body;

  const createUserResult = await User.doc(uid).set(
    {
      username,
      masterPasswordHint,
      email,
      image,
      roleUids: [],
      viewing: "",
      status: "online",
    },
    { merge: true }
  );

  if (createUserResult.empty) {
    res.status(400);
    throw new Error("There was an error creating this user!");
  }

  // create this user vault

  const createVaultResult = await vault.doc(uid).set(
    {
      members: [uid],
    },
    { merge: true }
  );

  if (createVaultResult.empty) {
    res.status(400);
    throw new Error("There was an error creating this vault!");
  }

  // create vault owner role

  const roleData = {
    name: "vaultOwner",
    abreviation: "VO",
  };

  const result = await vault.doc(uid).collection("roles").add(roleData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error creating the vault owner role!");
  }

  const createdRoleUid = result.id;

  const role = await (
    await vault.doc(uid).collection("roles").doc(createdRoleUid).get()
  ).data();

  if (role.empty) {
    res.status(400);
    throw new Error("There was an error finding the created role!");
  }

  // update user default role

  const updateRoleResult = await User.doc(uid).update({
    roleUids: [createdRoleUid],
  });

  if (updateRoleResult.empty) {
    res.status(400);
    throw new Error("There was an error updating this role!");
  }

  res.status(201).json(role);
});

const removeUser = asyncHandler(async (req, res) => {
  const { uid } = req.body;

  const result = await User.doc(uid).delete();

  res.status(201).json(result);
});

module.exports = {
  // getAllUser,
  updateUserEmail,
  updateUserData,
  updateUserPasswordHint,
  getUserData,
  getMasterPasswordHint,
  createUser,
  removeUser,
  updateUserData,
};
