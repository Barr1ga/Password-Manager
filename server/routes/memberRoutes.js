const express = require("express");
const router = express.Router();
const {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

router.route("/getAllMembers").post(getAllMembers);
router.route("/createMember").post(createMember);
router.route("/updateMember").post(updateMember);
router.route("/deleteMember").post(deleteMember);

module.exports = router;
