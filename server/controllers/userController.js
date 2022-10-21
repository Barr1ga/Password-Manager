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

const updateUserData = asyncHandler(async (req, res) => {
  const { uid, username } = req.body;
  const result = await User.doc(uid).update({
    username,
  });

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error updating this user!");
  }

  res.status(201).json(result);
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

  const updatedDocument = await User.doc(data).get();

  if (updatedDocument.empty) {
    res.status(400);
    throw new Error("User not found!");
  }

  const { username } = updatedDocument.data();

  res.status(201).json(username);
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
  console.log(req.body);
  const { uid, username, masterPasswordHint, email } = req.body;

  const result = await User.doc(uid).set({
    username,
    masterPasswordHint,
    email,
  });

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

const updateUser = asyncHandler(async (req, res) => {
  const { uid, username, masterPasswordHint } = req.body;

  const result = await User.doc(uid).update({
    username,
  });

  res.status(201).json(result);
});

module.exports = {
  getAllUser,
  updateUserData,
  updateUserPasswordHint,
  getUserData,
  getMasterPasswordHint,
  createUser,
  removeUser,
  updateUserData,
};
