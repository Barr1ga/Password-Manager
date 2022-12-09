const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notificationController");

router.route("/getAllNotifications").post(getAllNotifications);
router.route("/createNotification").post(createNotification);
router.route("/updateNotification").post(updateNotification);
router.route("/deleteNotification").post(deleteNotification);

module.exports = router;
