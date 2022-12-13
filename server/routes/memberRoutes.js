const express = require("express");
const router = express.Router();
const {
  getAllMembers,
  updateMemberRoles,
  kickMember,
} = require("../controllers/memberController");

router.route("/getAllMembers").post(getAllMembers);
router.route("/updateMemberRoles").post(updateMemberRoles);
router.route("/kickMember").post(kickMember);

module.exports = router;
