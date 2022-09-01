import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordInformation from "../components/PasswordInformation";
import { useParams } from "react-router-dom";

const CurrentPasswordItemPage = () => {
  const { id } = useParams();

  console.log(id);
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
      <div className="margin-content padding-side">
        <PasswordInformation
          currentPassword={currentPassword}
        ></PasswordInformation>
      </div>
    </>
  );
};

export default CurrentPasswordItemPage;
