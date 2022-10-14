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

const getMasterPasswordHint = asyncHandler(async (req, res) => {
  const { data } = req.body;
  console.log(req.body)
  const result = await User.where("email", "==", data).get("masterPasswordHint");

  res.status(201).json(result);
});

const createUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { uid, username, masterPasswordHint, email } = req.body;

  const result = await User.doc(uid).set({ username, masterPasswordHint, email });

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
    username
  });

  res.status(201).json(result);
});

module.exports = { getAllUser, getMasterPasswordHint, createUser, removeUser };
