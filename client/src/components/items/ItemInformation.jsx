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
  resetItemQueryFulfilled,
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
const CryptoJS = require("crypto-js");

const ItemInformation = ({ currentItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentVault } = useSelector((state) => state.auth);

  var decryptedItem = JSON.parse(JSON.stringify(currentItem));
  // decrypt
  if (decryptedItem) {
    for (const key in decryptedItem) {
      if (
        key !== "favorite" &&
        key !== "trash" &&
        key !== "folders" &&
        key !== "type" &&
        key !== "image" &&
        key !== "uid"
      ) {
        decryptedItem[key] = CryptoJS.AES.decrypt(
          decryptedItem[key],
          currentVault
        ).toString(CryptoJS.enc.Utf8);
      }
    }
  }

  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState("login");
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(decryptedItem?.image);
  const [currentImageLetter, setCurrentImageLetter] = useState(
    decryptedItem?.name.charAt(0)
  );
  const { authUser, isUserOwner } = useSelector((state) => state.auth);
  const { itemFulfilled, itemError, itemDeletedFullfilled } = useSelector(
    (state) => state.items
  );
  const method = "update";

  const [show, setShow] = useState(false);

  const handleCloseConfirmation = () => setShow(false);

  const selectedTypeFormatted =
    selectedType === "wifiPassword"
      ? "Wifi Password"
      : selectedType === "secureNote"
      ? "Secure Note"
      : selectedType.charAt(0).toUpperCase().concat(selectedType.slice(1));

  useEffect(() => {
    if (itemDeletedFullfilled) {
      dispatch(resetItemQueryFulfilled());
    }
  }, [itemDeletedFullfilled]);

  useEffect(() => {
    setShowTypeOptions(false);
    setSelectedType(decryptedItem?.type);
    setCurrentImage(decryptedItem?.image);
  }, [decryptedItem]);

  useEffect(() => {
    if (itemFulfilled || itemError) {
      setDeleteLoading(false);
      setRestoreLoading(false);
      handleCloseConfirmation();
    }
  }, [itemFulfilled, itemError]);

  const handleDeleteItem = () => {
    if (decryptedItem?.trash) {
      setDeleteLoading(true);
      dispatch(deleteItem({ uid: authUser.uid, itemUid: decryptedItem?.uid }));

      const auditData = {
        uid: authUser.uid,
        auditLogData: {
          actorUid: authUser.uid,
          action: "item/hardDelete",
          description: "permanently deleted the item",
          benefactor: decryptedItem?.name,
          date: new Date(),
        },
      };
      dispatch(createLog(auditData));
    }

    if (!decryptedItem?.trash) {
      const newData = {
        uid: authUser.uid,
        itemUid: decryptedItem?.uid,
        itemData: {
          trash: true,
        },
      };

      setDeleteLoading(true);
      dispatch(updateItem(newData));

      const auditData = {
        uid: authUser.uid,
        auditLogData: {
          actorUid: authUser.uid,
          action: "item/softDelete",
          description: "deleted the item",
          benefactor: decryptedItem?.name,
          date: new Date(),
        },
      };
      dispatch(createLog(auditData));
    }
  };

  const handleRestoreItem = () => {
    const newData = {
      uid: authUser.uid,
      itemUid: decryptedItem?.uid,
      itemData: {
        trash: false,
      },
    };

    setRestoreLoading(true);
    dispatch(updateItem(newData));

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "item/restore",
        description: "restored the item",
        benefactor: decryptedItem?.name,
        date: new Date(),
      },
    };
    dispatch(createLog(auditData));
  };

  const handleCloseMobile = () => {
    setShowPasswordGenerator(false);
    dispatch(resetSelectedItem());
    navigate(-1);
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
          <></>
          {!isUserOwner ? (
            <HiOutlineX
              className="btn-close"
              onClick={handleCloseMobile}
            ></HiOutlineX>
          ) : (
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
              component={<HiOutlineX className="btn-close"></HiOutlineX>}
              headerMessage={"Are you sure you want to leave this section?"}
              bodyMessage={
                "You have unsaved content, and will be lost unless you save it."
              }
            ></ConfirmModal>
          )}
        </div>
      </div>
      <div className="add-item-modal standard-stack gap-10">
        <h5>Item Information</h5>
        <div className="item-image">
          <div className="image">
            {currentImage !== "" ? (
              <img src={currentImage} alt={decryptedItem?.name}></img>
            ) : (
              <div className="default">{currentImageLetter}</div>
            )}
            {isUserOwner && (
              <div className="btn-circle update-image" htmlFor="upload-photo">
                <UploadImage
                  currentImage={currentImage}
                  setCurrentImage={setCurrentImage}
                  mode={"item"}
                ></UploadImage>
              </div>
            )}
          </div>
        </div>
        <div className="item-type">
          <label>
            Item Type <span className="error-message">*</span>
          </label>

          {isUserOwner && showTypeOptions ? (
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
            defaultValues={decryptedItem}
            isNotOwner={!isUserOwner}
          ></Login>
        )}

        {selectedType === "card" && (
          <Card
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={decryptedItem}
            isNotOwner={!isUserOwner}
          ></Card>
        )}

        {selectedType === "identification" && (
          <Identification
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={decryptedItem}
            isNotOwner={!isUserOwner}
          ></Identification>
        )}

        {selectedType === "secureNote" && (
          <SecureNote
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={decryptedItem}
            isNotOwner={!isUserOwner}
          ></SecureNote>
        )}

        {selectedType === "wifiPassword" && (
          <WifiPassword
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={decryptedItem}
            isNotOwner={!isUserOwner}
            showPasswordGenerator={showPasswordGenerator}
            setShowPasswordGenerator={setShowPasswordGenerator}
          ></WifiPassword>
        )}
        {decryptedItem?.trash && (
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
        {isUserOwner && (
          <div className="form-group">
            {decryptedItem?.trash ? (
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
        )}
      </div>
    </>
  );
};

export default ItemInformation;
