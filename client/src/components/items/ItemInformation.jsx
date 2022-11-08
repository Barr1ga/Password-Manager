import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineX,
  HiOutlineGlobe,
  HiOutlineCreditCard,
  HiOutlineIdentification,
  HiOutlineDocumentText,
  HiOutlineWifi,
  HiOutlineClipboardList,
  HiOutlineTrash,
} from "react-icons/hi";
import { MdOutlineRestore } from "react-icons/md";
import UploadImage from "../UploadImage";
import ConfirmModal from "../helpers/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  resetSelectedItem,
  updateItem,
} from "../../features/slice/itemSlice";
import { useNavigate } from "react-router-dom";

import Card from "../addItem/Card";
import Login from "../addItem/Login";
import SecureNote from "../addItem/SecureNote";
import WifiPassword from "../addItem/WifiPassword";
import Identification from "../addItem/Identification";
import SpinnerLoader from "../SpinnerLoader";
import { createLog } from "../../features/slice/auditLogSlice";

const ItemInformation = ({ currentItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState("login");
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(currentItem.image);
  const [currentImageLetter, setCurrentImageLetter] = useState(
    currentItem.name.charAt(0)
  );
  const { authUser } = useSelector((state) => state.auth);
  const { itemFulfilled, itemError, itemDeletedFullfilled } = useSelector(
    (state) => state.items
  );
  const method = "update";

  const [show, setShow] = useState(false);

  const handleCloseConfirmation = () => setShow(false);
  const handleShowConfirmation = () => setShow(true);

  const selectedTypeFormatted =
    selectedType === "wifiPassword"
      ? "Wifi Password"
      : selectedType === "secureNote"
      ? "Secure Note"
      : selectedType.charAt(0).toUpperCase().concat(selectedType.slice(1));

  useEffect(() => {
    if (itemDeletedFullfilled) {
      const auditData = {
        uid: authUser.uid,
        itemLogData: {
          actorUid: authUser.uid,
          action: "item/trash",
          description: "trashed the item",
          benefactorUid: currentItem.uid,
          date: new Date(),
        },
      };
      dispatch(createLog(auditData));
    }
  }, [itemDeletedFullfilled]);

  useEffect(() => {
    setShowTypeOptions(false);
    setSelectedType(currentItem.type);
    setCurrentImage(currentItem.image);
  }, [currentItem]);

  useEffect(() => {
    if (itemFulfilled || itemError) {
      setDeleteLoading(false);
      setRestoreLoading(false);
      handleCloseConfirmation();
    }
  }, [itemFulfilled, itemError]);

  const handleDeleteItem = () => {
    if (currentItem.trash) {
      setDeleteLoading(true);
      dispatch(deleteItem({ uid: authUser.uid, itemUid: currentItem.uid }));
    }

    if (!currentItem.trash) {
      const newData = {
        uid: authUser.uid,
        itemUid: currentItem.uid,
        itemData: {
          trash: true,
        },
      };

      setDeleteLoading(true);
      dispatch(updateItem(newData));
    }
  };

  const handleRestoreItem = () => {
    const newData = {
      uid: authUser.uid,
      itemUid: currentItem.uid,
      itemData: {
        trash: false,
      },
    };

    setRestoreLoading(true);
    dispatch(updateItem(newData));
  };

  const handleCloseMobile = () => {
    setShowPasswordGenerator(false);
    dispatch(resetSelectedItem());
    navigate(-1);
  };

  const handleClose = () => {
    setShowPasswordGenerator(false);
    dispatch(resetSelectedItem());
  };

  const handleBack = () => {
    setShowPasswordGenerator(false);
  };

  const handleTypeClicked = (value) => {
    setSelectedType(value);
    setShowTypeOptions(false);
    handleBack();
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div className="back-enabled">
            {showPasswordGenerator && (
              <HiOutlineArrowLeft
                className="btn-back"
                onClick={handleBack}
              ></HiOutlineArrowLeft>
            )}
            <h4>Update Item</h4>
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
      </div>
      <div className="add-item-modal standard-stack gap-10">
        <h5>Item Information</h5>
        <div className="item-image">
          <div className="image">
            {currentImage !== "" ? (
              <img src={currentImage} alt={currentItem.name}></img>
            ) : (
              <div className="default">{currentImageLetter}</div>
            )}
            <div className="btn-circle update-image" htmlFor="upload-photo">
              <UploadImage
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
                mode={"item"}
              ></UploadImage>
            </div>
          </div>
        </div>
        <div className="item-type">
          <label>
            Item Type <span className="error-message">*</span>
          </label>

          {showTypeOptions ? (
            <div className="types standard-stack gap-10">
              <small>Select the type of this item.</small>
              <div className="options">
                <Button
                  className="btn-secondary btn-with-icon"
                  onClick={() => handleTypeClicked("login")}
                >
                  <HiOutlineGlobe></HiOutlineGlobe>Login
                </Button>
                <Button
                  className="btn-secondary btn-with-icon"
                  onClick={() => handleTypeClicked("card")}
                >
                  <HiOutlineCreditCard></HiOutlineCreditCard>Card
                </Button>
              </div>
              <div className="options">
                <Button
                  className="btn-secondary btn-with-icon"
                  onClick={() => handleTypeClicked("identification")}
                >
                  <HiOutlineIdentification></HiOutlineIdentification>
                  Identification
                </Button>
                <Button
                  className="btn-secondary btn-with-icon"
                  onClick={() => handleTypeClicked("secureNote")}
                >
                  <HiOutlineDocumentText></HiOutlineDocumentText>Secure Note
                </Button>
              </div>
              <div className="options">
                <Button
                  className="btn-secondary btn-with-icon"
                  onClick={() => handleTypeClicked("wifiPassword")}
                >
                  <HiOutlineWifi></HiOutlineWifi>Wifi Password
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className="btn-secondary btn-with-icon btn-long"
              onClick={() => setShowTypeOptions(true)}
            >
              {selectedType === "login" && <HiOutlineGlobe></HiOutlineGlobe>}
              {selectedType === "card" && (
                <HiOutlineCreditCard></HiOutlineCreditCard>
              )}
              {selectedType === "identification" && (
                <HiOutlineIdentification></HiOutlineIdentification>
              )}
              {selectedType === "secureNote" && (
                <HiOutlineDocumentText></HiOutlineDocumentText>
              )}
              {selectedType === "wifiPassword" && (
                <HiOutlineWifi></HiOutlineWifi>
              )}
              {selectedTypeFormatted}
            </Button>
          )}
        </div>

        {selectedType === "login" && (
          <Login
            currentImage={currentImage}
            setCurrentImageLetter={setCurrentImageLetter}
            method={method}
            showPasswordGenerator={showPasswordGenerator}
            setShowPasswordGenerator={setShowPasswordGenerator}
            defaultValues={currentItem}
          ></Login>
        )}

        {selectedType === "card" && (
          <Card
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={currentItem}
          ></Card>
        )}

        {selectedType === "identification" && (
          <Identification
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={currentItem}
          ></Identification>
        )}

        {selectedType === "secureNote" && (
          <SecureNote
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={currentItem}
          ></SecureNote>
        )}

        {selectedType === "wifiPassword" && (
          <WifiPassword
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={currentItem}
            showPasswordGenerator={showPasswordGenerator}
            setShowPasswordGenerator={setShowPasswordGenerator}
          ></WifiPassword>
        )}
        {currentItem.trash && (
          <div className="form-group">
            <Button
              type="submit"
              className="btn-secondary btn-long btn-with-icon"
              onClick={handleRestoreItem}
            >
              {restoreLoading ? (
                <SpinnerLoader></SpinnerLoader>
              ) : (
                <>
                  <MdOutlineRestore></MdOutlineRestore>Restore Item
                </>
              )}
            </Button>
          </div>
        )}
        <div className="form-group">
          {currentItem.trash ? (
            <>
              <ConfirmModal
                proceedInteraction={
                  <Button
                    type="button"
                    onClick={handleDeleteItem}
                    className="btn-dark btn-long"
                  >
                    {deleteLoading ? (
                      <SpinnerLoader></SpinnerLoader>
                    ) : (
                      <>Delete</>
                    )}
                  </Button>
                }
                component={
                  <div className="form-group">
                    <Button
                      type="button"
                      className="btn-secondary danger btn-long btn-with-icon"
                    >
                      <HiOutlineTrash></HiOutlineTrash>Delete Role Permanently
                    </Button>
                  </div>
                }
                headerMessage={
                  "Are you sure you want to permanently delete this item?"
                }
                bodyMessage={
                  "This item will be deleted immediately. You can't undo this action."
                }
              ></ConfirmModal>
            </>
          ) : (
            <>
              <Button
                type="submit"
                className="btn-secondary danger btn-long btn-with-icon"
                onClick={handleDeleteItem}
              >
                {deleteLoading ? (
                  <SpinnerLoader></SpinnerLoader>
                ) : (
                  <>
                    <HiOutlineTrash></HiOutlineTrash>Delete Item
                  </>
                )}
              </Button>
            </>
          )}
        </div>
        <hr></hr>
        <div className="last-updated">
          <div>
            <Link to="/AuditLog" type="button">
              <HiOutlineClipboardList></HiOutlineClipboardList>
            </Link>
          </div>
          <small>
            Last updated: Thu Sep 01 2022 21:01:16 GMT+0800 (Philippine Standard
            Time)
          </small>
        </div>
      </div>
    </>
  );
};

export default ItemInformation;
