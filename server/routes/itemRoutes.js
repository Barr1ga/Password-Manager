const express = require("express");
const router = express.Router();
const { getAllItems, createItem } = require("../controllers/itemController");

router.route("/getAllItems").post(getAllItems);
router.route("/createItem").post(createItem);

module.exports = router;
