import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateEmail,
  signInWithRedirect,
  GoogleAuthProvider,
  deleteUser,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import axios from "axios";

const API_URL = "/api/auth";

const logInWithEmailAndPassword = async (data) => {
  const { email, password } = data;
  return signInWithEmailAndPassword(auth, email, password);
};

const getUserData = async (data) => {
  const response = await axios.post(API_URL + "/getUserData", {
    data,
  });
  return response.data;
};

const getVaultOwners = async (data) => {
  const response = await axios.post(API_URL + "/getVaultOwners", {
    data,
  });
  return response.data;
};

const updateUserData = async (data) => {
  const { uid, username } = data;

  const response = await axios.post(API_URL + "/updateUserData", {
    uid,
    username,
  });
  return response.data;
};

const updateUserEmail = async (data) => {
  const response = await axios.post(API_URL + "/updateUserEmail", data);
  return response.data;
};

const updateUserPasswordHint = async (data) => {
  const { uid, masterPasswordHint } = data;
  const response = await axios.post(API_URL + "/updateUserPasswordHint", {
    uid,
    masterPasswordHint,
  });
  return response.data;
};

const getMasterPasswordHint = async (data) => {
  const response = await axios.post(API_URL + "/getMasterPasswordHint", {
    data,
  });
  return response.data;
};

const createUser = async (data) => {
  const response = await axios.post(API_URL + "/createUser", data);
  return response.data;
};

const registerWithEmailAndPassword = async (data) => {
  const { email, password } = data;
  return createUserWithEmailAndPassword(auth, email, password);
};

const Reauthentication = async (data) => {
  const credential = EmailAuthProvider.credential(auth.currentUser.email, data);
  return reauthenticateWithCredential(auth.currentUser, credential);
};

const changeEmail = async (data) => {
  return updateEmail(auth.currentUser, data);
};

const changePassword = async (data) => {
  return updatePassword(auth.currentUser, data);
};

const continueWithGoogle = async (data) => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

const removeAccount = async () => {
  return deleteUser(auth.currentUser);
};

const removeUser = async (uid) => {
  const response = await axios.post(API_URL + "/removeUser", uid);
  return response.data;
};

const logOut = async () => {
  return signOut(auth);
};

const userService = {
  logInWithEmailAndPassword,
  updateUserEmail,
  updateUserData,
  updateUserPasswordHint,
  getUserData,
  getVaultOwners,
  getMasterPasswordHint,
  createUser,
  removeUser,
  registerWithEmailAndPassword,
  Reauthentication,
  changeEmail,
  changePassword,
  continueWithGoogle,
  removeAccount,
  logOut,
};

export default userService;
