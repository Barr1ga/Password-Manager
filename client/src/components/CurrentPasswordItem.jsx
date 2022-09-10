import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordInformation from "./PasswordInformation";

const CurrentPasswordItem = () => {
  const { passwords, selectedPassword } = useSelector(
    (state) => state.passwords
  );

  let currentPassword = passwords.find(
    (password) => password.id === selectedPassword
  );

  useEffect(() => {
    currentPassword = passwords.find(
      (password) => password.id === selectedPassword
    );
  }, [selectedPassword]);

  if (!currentPassword) {
    return <></>;
  }

  return (
    <>
      <PasswordInformation currentPassword={currentPassword}></PasswordInformation>
    </>
  );
};

export default CurrentPasswordItem;