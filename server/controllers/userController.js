const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler(async (req, res) => {
    console.log("Register");
    res.status(200).json({message: "register"});
})

const loginUser = asyncHandler(async (req, res) => {
    console.log("Register");
    res.status(200).json({message: "register"});
})

module.exports = {registerUser, loginUser};