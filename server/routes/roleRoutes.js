const express = require("express");
const router = express.Router();
const {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

router.route("/getAllRoles").post(getAllRoles);
router.route("/createRole").post(createRole);
router.route("/updateRole").post(updateRole);
router.route("/deleteRole").post(deleteRole);

module.exports = router;
