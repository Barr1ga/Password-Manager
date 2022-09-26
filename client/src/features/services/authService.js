import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const registerWithEmailAndPassword = async (data) => {
  const { email, password } = data;
  return auth.createUserWithEmailAndPassword(email, password);
};

const continueWithGoogle = async (data) => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

const logOut = async () => {
  return signOut(auth);
};

const userService = {
  registerWithEmailAndPassword,
  continueWithGoogle,
  logOut,
};

export default userService;
