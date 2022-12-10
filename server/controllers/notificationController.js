const asyncHandler = require("express-async-handler");
const { db, admin } = require("../util/admin");
const vault = db.collection("vaults");
const User = db.collection("Users");

const LIMIT_QUERY = 1;

const getAllNotifications = asyncHandler(async (req, res) => {
  const { uid } = req.body;

  let userUids = [];
  const notifications = await (
    await User.doc(uid).collection("notifications").get()
  ).docs.map((doc) => {
    userUids = [...userUids, doc.data().actorUid];
    return { ...doc.data(), uid: doc.id };
  });

  await (
    await User.where(
      admin.firestore.FieldPath.documentId(),
      "in",
      userUids
    ).get()
  ).docs.forEach((doc) => {
    const { username } = doc.data();
    const uid = doc.id;
    console.log(uid);
    notifications.forEach((notification) => {
      if (notification.actorUid === uid) {
        notification.username = username;
      }
      console.log(notification);
    });
  });

  res.status(201).json(notifications);
});

const createNotification = asyncHandler(async (req, res) => {
  const { benefactor, notificationData } = req.body;

  const user = await User.where("email", "==", benefactor).limit(1).get();

  if (user.empty) {
    res.status(400);
    throw new Error("There was an error creating this notification!");
  }

  const userUid = user.docs[0].id;
  console.log("userUid", userUid);
  notificationData.date = new Date();
  console.log(notificationData);

  const createResult = await User.doc(userUid)
    .collection("notifications")
    .add(notificationData);

  if (createResult.empty) {
    res.status(400);
    throw new Error("There was an error creating this notification!");
  }
  console.log("createResult", createResult);
  const createdNotificationUid = createResult.id;

  const notification = await vault
    .doc(userUid)
    .collection("notifications")
    .doc(createdNotificationUid)
    .get();

  if (notification.empty) {
    res.status(400);
    throw new Error("There was an error finding the created notification!");
  }
  console.log(notification);
  notification.uid = createdNotificationUid;

  res.status(201).json(notification);
});

const updateNotification = asyncHandler(async (req, res) => {
  const { uid, notificationUid, notificationData } = req.body;

  const result = await User.doc(uid)
    .collection("notifications")
    .doc(notificationUid)
    .update(notificationData);

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error updating this notification!");
  }

  const notification = await (
    await User.doc(uid).collection("notifications").doc(notificationUid).get()
  ).data();

  if (notification.empty) {
    res.status(400);
    throw new Error("There was an error finding the created notification!");
  }

  notification.uid = notificationUid;

  res.status(201).json(notification);
});

const deleteNotification = asyncHandler(async (req, res) => {
  const { uid, notificationUid } = req.body;

  const result = await vault
    .doc(uid)
    .collection("notifications")
    .doc(notificationUid)
    .delete();

  if (result.empty) {
    res.status(400);
    throw new Error("There was an error deleting this notification!");
  }
  res.status(201).json(notificationUid);
});

module.exports = {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
};
