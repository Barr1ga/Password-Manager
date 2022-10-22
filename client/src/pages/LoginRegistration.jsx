import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../components/Login";
import Register from "../components/Register";
import { resetAuthErrors } from "../features/slice/authSlice";

const LoginRegistration = () => {
  const [showLogin, setShowLogin] = useState(true);

  const { authError, authMessage, authErrorMessage, authErrorCode } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleShowRegistration = () => {
    if (
      authError ||
      authMessage !== "" ||
      authErrorMessage !== "" ||
      authErrorCode
    ) {
      dispatch(resetAuthErrors());
    }
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    if (
      authError ||
      authMessage !== "" ||
      authErrorMessage !== "" ||
      authErrorCode
    ) {
      dispatch(resetAuthErrors());
    }
    setShowLogin(true);
  };

  return (
    <>
      {showLogin ? (
        <Login handleShowRegistration={handleShowRegistration}></Login>
      ) : (
        <Register handleShowLogin={handleShowLogin}></Register>
      )}
    </>
  );
};

export default LoginRegistration;
