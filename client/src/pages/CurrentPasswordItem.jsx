import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordInformation from "../components/PasswordInformation";
import { useParams } from "react-router-dom";

const CurrentPasswordItemPage = () => {
  const { id } = useParams();

  const { items, selectedPassword } = useSelector(
    (state) => state.items
  );

  let currentPassword = items.find(
    (password) => password.id === selectedPassword
  );

  useEffect(() => {
    currentPassword = items.find(
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
