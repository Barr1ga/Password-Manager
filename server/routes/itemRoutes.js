const express = require("express");
const router = express.Router();
const {
  getAllItems,
  createItem,
  getFavorites,
  getTrash,
  getTypeSpecific,
  getFolderSpecific,
} = require("../controllers/itemController");

router.route("/getAllItems").post(getAllItems);
router.route("/getFavorites").post(getFavorites);
router.route("/getTrash").post(getTrash);
router.route("/getFolderSpecific").post(getFolderSpecific);
router.route("/createItem").post(createItem);

module.exports = router;
