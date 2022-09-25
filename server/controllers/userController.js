const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const User = db.collection("Users");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.get();
  User.onSnapshot((snapshot) => {
    console.log("this is a test");
    snapshot.docs.map((doc) => {
      console.log(doc.data());
    });
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, masterPassword } = req.body;
  //   console.log(req.body);
  //   console.log("Register");
  //   const user = await User.add(req.body);

  const auth = getAuth();
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    masterPassword,
  );

  const adminAuth = getAdminAuth();
  const token = await adminAuth.createCustomToken(credential.user.uid);
  await firestore.doc(`users/${credential.user.uid}`).set({ secureNote });
  res.status(201).json({ token });

//   res.status(200).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  console.log("Login");

  const objecttest = {
    name: "horeb",
    age: 2,
  };

  res.status(200).json(objecttest);
});

module.exports = { getAllUser, registerUser, loginUser };
