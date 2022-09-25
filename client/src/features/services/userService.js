import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const registerUser = async (data) => {
    console.log(data)
    const { email, password } = data;
    return auth.createUserWithEmailAndPassword(email, password);
  };
  
  const userService = {
    registerUser,
  };
  
  export default userService;