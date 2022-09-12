// Import the functions you need from the SDKs you need
//  TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyAslCHm2Db3tjaXG_06-aen0Nk1g9WfAxo",
  authDomain: "vaulteer-password-manager.firebaseapp.com",
  projectId: "vaulteer-password-manager",
  storageBucket: "vaulteer-password-manager.appspot.com",
  messagingSenderId: "443375059351",
  appId: "1:443375059351:web:efcd1598a4fbef583084d2",
  measurementId: "G-6BQ79DXW0R",
};

firebase.initializeApp(firebaseConfig); //initialize firebase app
module.exports = { firebase }; //export the app
