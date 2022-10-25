import React, { useEffect, useState } from "react";
import AddButton from "./helpers/AddButton";
import Modal from "react-bootstrap/Modal";
import { HiOutlineCamera, HiOutlineX, HiPlus } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "./helpers/ConfirmModal";
import {
  getBrandDetails,
  resetBrandPhotoLink,
} from "../features/slice/passwordSlice";
import SpinnerLoader from "./SpinnerLoader";

const UploadImage = ({ mode }) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const { brandLoading, brandPhotoLink } = useSelector(
    (state) => state.passwords
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const removePhoto = () => {
    dispatch(resetBrandPhotoLink());
    setPreview(null);
    setSelectedFile(null);
  };

  const onSubmit = (data) => {
    if (selectedFile && preview) {
      removePhoto();
    }
    dispatch(getBrandDetails(data));
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    dispatch(resetBrandPhotoLink());
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <HiOutlineCamera onClick={() => setModalShow(true)}></HiOutlineCamera>
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
              <h4>Update {mode} picture</h4>
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
        <Modal.Body className="upload-photo-modal standard-stack gap-10">
          {selectedFile && (
            <>
              <div className="padding-side uploaded-image">
                <img src={preview} alt={preview} />
                <Button className="btn-secondary" onClick={removePhoto}>
                  Remove Photo
                </Button>
              </div>
            </>
          )}
          {brandPhotoLink !== "" && (
            <>
              <div className="padding-side uploaded-image">
                <img src={brandPhotoLink} alt={brandPhotoLink} />
                <Button className="btn-secondary" onClick={removePhoto}>
                  Remove Photo
                </Button>
              </div>
            </>
          )}
          {/* <div className="default"></div> */}
          <p>You can upload your own photo or get a brand logo from an API</p>
          <label htmlFor="upload-photo" className="btn-secondary btn-with-icon">
            <HiPlus></HiPlus>Upload Photo
          </label>
          <input
            type="file"
            id="upload-photo"
            onChange={onSelectFile}
            class="hidden"
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            <label for="files">
              Brand Name <span className="error-message">*</span>
            </label>
            <div className="form-group-horizontal">
              <div className="form-group">
                <input
                  type="text"
                  {...register("brand", {
                    required: {
                      value: true,
                      message: "Brand is required",
                    },
                  })}
                  className={
                    errors.name ? "form-control form-error" : "form-control "
                  }
                />
              </div>

              <Button
                type="submit"
                className="btn-secondary btn-with-icon"
                style={{ width: "96.8px" }}
              >
                {brandLoading ? <SpinnerLoader></SpinnerLoader> : "Get Logo"}
              </Button>
            </div>
            {errors.name && (
              <small className="error-message">
                {errors.name.message}
                <br></br>
              </small>
            )}
          </form>
          <Button className="btn-dark">Save Changes</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UploadImage;
