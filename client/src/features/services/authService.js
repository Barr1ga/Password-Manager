import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import axios from "axios";

const API_URL = "/api/auth";

const logInWithEmailAndPassword = async (data) => {
  const { email, password } = data;
  return signInWithEmailAndPassword(auth, email, password);
};

const createUser = async (data) => {
  const response = await axios.post(API_URL + "/createUser", data);
  return response.data;
};

const registerWithEmailAndPassword = async (data) => {
  const { email, password } = data;
  return createUserWithEmailAndPassword(auth, email, password);
};

const sendVerification = async () => {
  return sendEmailVerification(auth.currentUser);
};

const changeEmail = async (data) => {
  return updateEmail(auth.currentUser, data);
};

const changePassword = async (data) => {
  const { currentMasterPassword, newMasterPassword, retypeMasterPassword, masterPasswordHint } = data;
  return updatePassword(auth.currentUser, newMasterPassword);
};

const continueWithGoogle = async (data) => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

const logOut = async () => {
  return signOut(auth);
};



const userService = {
  logInWithEmailAndPassword,
  createUser,
  registerWithEmailAndPassword,
  sendVerification,
  changeEmail,
  changePassword,
  continueWithGoogle,
  logOut,
};

export default userService;
