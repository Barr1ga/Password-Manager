import {
  signInWithEmailAndPassword,
  updateEmail,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const logInWithEmailAndPassword = async (data) => {
  const { email, password } = data;
  return auth.signInWithEmailAndPassword(email, password);
}; 

const registerWithEmailAndPassword = async (data) => {
  const { email, password } = data;
  return auth.createUserWithEmailAndPassword(email, password);
};


const changeEmail = async (data) => {
  return updateEmail(data);
}

const continueWithGoogle = async (data) => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

const logOut = async () => {
  return signOut(auth);
};

const userService = {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  changeEmail,
  continueWithGoogle,
  logOut,
};

export default userService;
