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

const createUser = asyncHandler(async (req, res) => {
  const { uid, username, masterPasswordHint } = req.body;
//TODO: revise this
  const res = await User.doc(uid).set({ username, masterPasswordHint });

  res.status(201).json(res);
});

const loginUser = asyncHandler(async (req, res) => {
  console.log("Login");
  res.status(200).json();
});

module.exports = { getAllUser, createUser, loginUser };
