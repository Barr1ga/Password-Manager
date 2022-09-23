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
    console.log(req.body);
    console.log("Register");
    const user = await User.add(req.body);
    res.status(200).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
    console.log("Login");

    const objecttest = {
        name: "horeb",
        age: 2
    }
    
    res.status(200).json(objecttest);
});

module.exports = { getAllUser, registerUser, loginUser };
