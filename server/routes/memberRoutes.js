const express = require("express");
const router = express.Router();
const {
  getAllMembers,
  updateMemberRoles,
  kickMember,
  assignMultipleMemberRole,
  unAssignMultipleMemberRole,
} = require("../controllers/memberController");

router.route("/getAllMembers").post(getAllMembers);
router.route("/updateMemberRoles").post(updateMemberRoles);
router.route("/assignMultipleMemberRole").post(assignMultipleMemberRole);
router.route("/unAssignMultipleMemberRole").post(unAssignMultipleMemberRole);
router.route("/kickMember").post(kickMember);

module.exports = router;
