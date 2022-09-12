const asyncHandler = require("express-async-handler");
const { db } = require("../util/admin");
const User = db.collection("Users");

const getAllUser = asyncHandler(async(req, res ) => {
    const user = await User.get();
    User.onSnapshot((snapshot) => {
        console.log("this is a test")
        snapshot.docs.map((doc) => {
            console.log(doc.data());
        })
    })
})

const registerUser = asyncHandler(async (req, res) => {
    console.log("Register");
    const user = await User.add({ name: "test" });
    res.status(200).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
    console.log("Login");
    
    res.status(200).json("test");
});

module.exports = { getAllUser, registerUser, loginUser };
