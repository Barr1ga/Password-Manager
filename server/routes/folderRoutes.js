const express = require("express");
const router = express.Router();
const {
  getAllFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} = require("../controllers/folderController");

router.route("/getAllFolders").post(getAllFolders);
router.route("/createFolder").post(createFolder);
router.route("/updateFolder").post(updateFolder);
router.route("/deleteFolder").post(deleteFolder);

module.exports = router;
