const express = require("express");
const router = express.Router();
const {
  getAllLogs,
  createLog,
} = require("../controllers/auditLogController");

router.route("/getAllLogs").post(getAllLogs);
router.route("/createLog").post(createLog);

module.exports = router;
