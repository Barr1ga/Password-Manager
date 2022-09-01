import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const LoginRegistration = () => {
  const [showLogin, setShowLogin] = useState(true);
  const handleShowRegistration = () => {
    setShowLogin(false);
  };

  const handleShowLogin = () => {
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
