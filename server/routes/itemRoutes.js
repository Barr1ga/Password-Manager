const express = require("express");
const router = express.Router();
const {
  getAllItems,
  createItem,
  getFavorites,
  getTrash,
  getTypeSpecific,
  updateItem,
} = require("../controllers/itemController");

router.route("/getAllItems").post(getAllItems);
router.route("/getFavorites").post(getFavorites);
router.route("/getTrash").post(getTrash);
router.route("/createItem").post(createItem);
router.route("/updateItem").post(updateItem);

module.exports = router;
