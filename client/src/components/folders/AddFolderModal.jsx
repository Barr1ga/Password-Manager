import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddButton from "../helpers/AddButton";
import Button from "react-bootstrap/Button";
import {
  HiOutlineX,
  HiFolder,
  HiPlusSm,
  HiPlus,
  HiOutlineLockClosed,
} from "react-icons/hi";
import ConfirmModal from "../helpers/ConfirmModal";
import { useForm } from "react-hook-form";

const AddItemModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleCloseModal = () => {
    setModalShow(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div onClick={() => setModalShow(true)}>
        <span className="icon">
          <HiPlus></HiPlus>
        </span>
      </div>
      <Modal
        scrollable
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        show={modalShow}
        onHide={handleCloseModal}
      >
        <Modal.Header>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
          <div className="page-header-with-close">
            <div className="back-enabled">
              <h4>Add Folder</h4>
            </div>
            <ConfirmModal
              proceedInteraction={
                <Button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn-dark btn-long"
                >
                  Leave
                </Button>
              }
              component={<HiOutlineX className="btn-close"></HiOutlineX>}
              headerMessage={"Are you sure you want to leave this section?"}
              bodyMessage={
                "You have unsaved content, and will be lost unless you save it."
              }
            ></ConfirmModal>
          </div>
        </Modal.Header>
        <Modal.Body className="add-item-modal standard-stack gap-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>
                Folder Name<span className="error-message">*</span>
              </label>
              <input
                type="text"
                {...register("folderName", {
                  required: {
                    value: true,
                    message: "Folder Name is required",
                  },
                })}
                className={
                  errors.folderName
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              {errors.folderName && (
                <small className="error-message">
                  {errors.folderName.message}
                  <br></br>
                </small>
              )}
            </div>
            <div className="form-group">
              <Button type="submit" className="btn-dark btn-long btn-with-icon">
                <HiPlus></HiPlus>Add Item
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
