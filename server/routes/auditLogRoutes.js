const express = require("express");
const router = express.Router();
const {
  getAllLogs,
  createItemLog,
} = require("../controllers/auditLogController");

router.route("/getAllLogs").post(getAllLogs);
router.route("/createItemLog").post(createItemLog);

module.exports = router;
