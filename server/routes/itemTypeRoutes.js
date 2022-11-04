const express = require("express");
const router = express.Router();
const {
  getTypeSpecific,
  createItem,
} = require("../controllers/itemController");

router.route("/getTypeSpecific").post(getTypeSpecific);
router.route("/createItem").post(createItem);

module.exports = router;
