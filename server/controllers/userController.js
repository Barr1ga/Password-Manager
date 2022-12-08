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

  console.log(result.data().vaults);
  console.log("test1");

  const vaultsData = await (
    await User.where(
      admin.firestore.FieldPath.documentId(),
      "in",
      result.data().vaults
    ).get()
  ).docs.map((doc) => {
    const { username } = doc.data();
    const uid = doc.id;
    return { username, vault: uid };
  });

  console.log("test2");
  console.log(vaultsData);

  var returnData = result.data();
  returnData.vaults = vaultsData;
  console.log(returnData)
  res.status(200).json(returnData);
});

const getVaultOwners = asyncHandler(async (req, res) => {
  const { uid } = req.body;

  const vaultsData = await vaults.map((vault) => {
    const result = User.doc(data).get();
    if (result.empty) {
      res.status(400);
      throw new Error("User not found!");
    }

    return result.data()?.username;
  });

  res.status(200).json(vaultsData);
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
      viewing: "",
      status: "online",
    },
    { merge: true }
  );

  if (createUserResult.empty) {
    res.status(400);
    throw new Error("There was an error creating this user!");
  }

  // create vault owner role
  const createRoleResult = await vault.doc(uid).collection("roles").add({
    name: "Vault Owner",
    abbreviation: "VO",
    color: "#b970ff",
  });

  if (createRoleResult.empty) {
    res.status(400);
    throw new Error("There was an error creating the vault owner role!");
  }

  const createdRoleUid = createRoleResult.id;

  // create this user vault
  const createMemberResult = await vault
    .doc(uid)
    .collection("members")
    .doc(uid)
    .set({
      roleUids: [createdRoleUid],
    });

  if (createMemberResult.empty) {
    res.status(400);
    throw new Error("There was an error creating this vault's members!");
  }

  // create audit log for initial creation of vault

  const auditLogResult = await vault.doc(uid).collection("auditLogs").add({
    actorUid: uid,
    action: "vault/create",
    description: "created this vault",
    benefactorUid: uid,
    date: new Date(),
  });

  if (auditLogResult.empty) {
    res.status(400);
    throw new Error("There was an error creating this item log!");
  }

  res.status(201).json();
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
  getVaultOwners,
  getMasterPasswordHint,
  createUser,
  removeUser,
  updateUserData,
};
