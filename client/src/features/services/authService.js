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
  return signInWithEmailAndPassword(auth, email, password);
}; 

const registerWithEmailAndPassword = async (data) => {
  const { email, password } = data;
  return createUserWithEmailAndPassword(auth, email, password);
};


const changeEmail = async (data) => {
  console.log(auth.currentUser)
  return updateEmail(auth.currentUser, data);
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
