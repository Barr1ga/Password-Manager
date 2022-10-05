import React from "react";
import Button from "react-bootstrap/Button";
import { HiPlus } from "react-icons/hi";

const AddButton = ({message}) => {
  return (
    <>
      <Button className="btn-dark btn-with-icon"><HiPlus></HiPlus>{message}</Button>
    </>
  );
};

export default AddButton;
