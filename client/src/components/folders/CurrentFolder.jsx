import React, { useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { resetSelectedFolder } from "../../features/slice/folderSlice";
import ConfirmModal from "../helpers/ConfirmModal";
import Button from "react-bootstrap/Button";
import FolderInformation from "./FolderInformation";

const CurrentFolder = () => {
  const { folders, selectedFolder } = useSelector((state) => state.folders);
  let currentFolder = folders.find((item) => item.uid === selectedFolder);

  const dispatch = useDispatch();

  useEffect(() => {
    currentFolder = folders.find((item) => item.uid === selectedFolder);
  }, [selectedFolder]);

  useEffect(() => {
    return () => {
      dispatch(resetSelectedFolder());
    };
  }, []);

  const handleCloseMobile = () => {
    dispatch(resetSelectedFolder());
    Navigate(-1);
  };

  const handleClose = () => {
    dispatch(resetSelectedFolder());
  };

  if (!currentFolder) {
    return <></>;
  }

  return (
    <div className="margin-content">
      <div className="page-header">
        <div className="back-enabled">
          <h4>Update Folder</h4>
        </div>
        <ConfirmModal
          proceedInteraction={
            <Button
              type="button"
              onClick={handleCloseMobile}
              className="btn-dark btn-long"
            >
              Leave
            </Button>
          }
          component={
            <div className="screen-version">
              <div className="mobile">
                <HiOutlineX className="btn-close"></HiOutlineX>
              </div>
            </div>
          }
          headerMessage={"Are you sure you want to leave this section?"}
          bodyMessage={
            "You have unsaved content, and will be lost unless you save it."
          }
        ></ConfirmModal>
        <ConfirmModal
          proceedInteraction={
            <Button
              type="button"
              onClick={handleClose}
              className="btn-dark btn-long"
            >
              Leave
            </Button>
          }
          component={
            <div className="screen-version">
              <div className="non-mobile">
                <HiOutlineX className="btn-close"></HiOutlineX>
              </div>
            </div>
          }
          headerMessage={"Are you sure you want to leave this section?"}
          bodyMessage={
            "You have unsaved content, and will be lost unless you save it."
          }
          continueMessage={"Leave"}
        ></ConfirmModal>
      </div>
      {currentFolder && (
        <FolderInformation
          method={"update"}
          defaultValues={currentFolder}
        ></FolderInformation>
      )}
    </div>
  );
};

export default CurrentFolder;
