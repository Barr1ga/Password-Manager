
const serviceAccount = require("../admin/vaulteer-password-manager-firebase-adminsdk-ldyhp-48775f8a0e");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db, admin };
