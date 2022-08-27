import React from "react";
import Button from "react-bootstrap/Button";
import { HiPlus } from "react-icons/hi";

const AddItem = () => {
  return (
    <>
      <Button className="btn-secondary"><HiPlus></HiPlus>Add Item</Button>
    </>
  );
};

export default AddItem;
