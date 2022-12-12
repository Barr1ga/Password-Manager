const express = require("express");
const router = express.Router();
const {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
  updateMemberRoles,
  kickMember,
} = require("../controllers/memberController");

router.route("/getAllMembers").post(getAllMembers);
router.route("/createMember").post(createMember);
router.route("/updateMember").post(updateMember);
router.route("/deleteMember").post(deleteMember);
router.route("/updateMemberRoles").post(updateMemberRoles);
router.route("/kickMember").post(kickMember);

module.exports = router;
