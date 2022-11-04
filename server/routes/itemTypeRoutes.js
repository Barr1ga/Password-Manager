const express = require("express");
const router = express.Router();
const {
  getTypeSpecific,
  createItem,
  updateItem,
} = require("../controllers/itemController");

router.route("/getTypeSpecific").post(getTypeSpecific);
router.route("/createItem").post(createItem);
router.route("/updateItem").post(updateItem);

module.exports = router;
