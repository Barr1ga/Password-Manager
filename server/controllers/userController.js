const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const User = db.collection("Users");

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.get();
  User.onSnapshot((snapshot) => {
    console.log("this is a test");
    snapshot.docs.map((doc) => {
      console.log(doc.data());
    });
  });
});

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
  console.log("updatepashint");
  console.log(req.body);
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
  console.log("getUserData");
  console.log(data);
  const result = await User.doc(data).get();
  if (result.empty) {
    res.status(400);
    throw new Error("User not found!");
  }

  console.log(result.data());
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
  const { uid, username, masterPasswordHint, email } = req.body;

  const result = await User.doc(uid).set(
    {
      username,
      masterPasswordHint,
      email,
    },
    { merge: true }
  );

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error creating this user!");
  }

  res.status(201).json(result);
});

const removeUser = asyncHandler(async (req, res) => {
  const { uid } = req.body;

  const result = await User.doc(uid).delete();

  res.status(201).json(result);
});

module.exports = {
  getAllUser,
  updateUserEmail,
  updateUserData,
  updateUserPasswordHint,
  getUserData,
  getMasterPasswordHint,
  createUser,
  removeUser,
  updateUserData,
};
