import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { HiCheckCircle, HiOutlineDuplicate } from "react-icons/hi";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import WarningAlert from "./WarningAlert";
import ConfirmModal from "./Helpers/ConfirmModal";
import useGeneratePassword from "../hooks/useGeneratePassword";

const PasswordGenerator = ({ watchPassword, handleUsePassword }) => {
  const [securePassword, setSecurePassword] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [generateEmptyCriteria, setGenerateEmptyCriteria] = useState(false);
  const [generatedEmpty, setGeneratedEmpty] = useState(false);
  const { password, getPassword, resetPassword } = useGeneratePassword();
  const generatedRef = useRef();
  const clipBoard = useRef(null);

  useEffect(() => {
    return resetPassword();
  }, [watchPassword]);

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: errorsPassword },
  } = useForm({
    mode: "all",
    defaultValues: {
      length: 10,
    },
  });

  const onSubmitGenerate = (data) => {
    console.log("generatre");
    const { lowercase, uppercase, numbers, symbols, length } = data;
    if (!lowercase && !uppercase && !numbers && !symbols) {
      setGenerateEmptyCriteria(true);
      return;
    }

    if (generateEmptyCriteria) {
      setGenerateEmptyCriteria(false);
    }

    console.log("test1")
    getPassword(data);
    console.log("test2")
    console.log(password)

    if (lowercase || uppercase || numbers || symbols) {
      setSecurePassword(true);
    }
  };

  const handlePasswordCopied = () => {
    setShowToolTip(true);
    navigator.clipboard.writeText(password);
  };

  if (password !== "" && generatedRef.current) {
    generatedRef.current.value = password;
  }

  const handleGeneratorChange = () => {
    setSecurePassword(false);
  };

  return (
    <>
      <div className="generator-header">
        <h5>Password Generator</h5>
      </div>

      <div className="password-generator">
        <div className="form-group generator-field">
          <input
            type="text"
            ref={generatedRef}
            defaultValue={watchPassword}
            onChange={handleGeneratorChange}
            className="form-control password-generator-input"
          ></input>
          {securePassword && <HiCheckCircle className="secure"></HiCheckCircle>}
          <Button
            ref={clipBoard}
            onClick={handlePasswordCopied}
            onBlur={() => setShowToolTip(false)}
            className="btn-secondary copy-to-clipboard"
          >
            <HiOutlineDuplicate></HiOutlineDuplicate>
          </Button>
          <Overlay
            target={clipBoard.current}
            show={showToolTip}
            placement="top"
          >
            {(props) => (
              <Tooltip id="top" {...props}>
                Copied!
              </Tooltip>
            )}
          </Overlay>
        </div>
      </div>

      <form className="password-generator-form" onSubmit={handlePasswordSubmit(onSubmitGenerate)}>
        <div className="password-generator">
          <div className="form-group form-group-horizontal">
            <p>Password Length</p>
            <input
              type="number"
              min="10"
              max="30"
              {...registerPassword("length")}
              className="form-control length"
            ></input>
          </div>
          <hr></hr>
          <div className="form-group form-group-horizontal">
            <label>Include Uppercase Letters</label>
            <input
              type="checkbox"
              {...registerPassword("uppercase")}
              className="form-checkbox"
            />
          </div>
          <div className="form-group form-group-horizontal">
            <label>Include Lowercase Letters</label>
            <input
              type="checkbox"
              {...registerPassword("lowercase")}
              className="form-checkbox"
            />
          </div>
          <div className="form-group form-group-horizontal">
            <label>Include Numbers</label>
            <input
              type="checkbox"
              {...registerPassword("numbers")}
              className="form-checkbox"
            />
          </div>
          <div className="form-group form-group-horizontal">
            <label>Include Symbols</label>
            <input
              type="checkbox"
              {...registerPassword("symbols")}
              className="form-checkbox"
            />
          </div>
        </div>
        <div className="form-group">
          <WarningAlert
            message={"Do not share your password to unauthorized users."}
          ></WarningAlert>
        </div>
        <div className="form-group">
          {generateEmptyCriteria && (
            <small className="error-message">
              ⚠ Password criterias are required
            </small>
          )}

          {generateEmptyCriteria && generatedEmpty && <br></br>}

          {generatedEmpty && (
            <small className="error-message">
              ⚠ You have not yet generated a password
            </small>
          )}
        </div>
        <div className="generate-use">
          <Button type="submit" className="btn-dark btn-long">
            Generate
          </Button>
          <div className="btn-long">
            {/* {console.log(generatedRef.current.value !== "" ? true : false)} */}
            {!generatedRef.current || generatedRef.current.value === "" ? (
              <Button
                type="button"
                onClick={() => setGeneratedEmpty(true)}
                className="btn-secondary btn-long"
              >
                Use Password
              </Button>
            ) : generatedRef.current &&
              generatedRef.current.value !== "" &&
              (watchPassword && watchPassword) !== "" ? (
              <ConfirmModal
                handleProceed={() => handleUsePassword(password)}
                component={
                  <Button type="button" className="btn-secondary btn-long">
                    Use Password
                  </Button>
                }
                headerMessage={"Are you sure you want to use this password?"}
                bodyMessage={
                  "You already have a password for this item, do you want to replace it?"
                }
                continueMessage={"Yes"}
              ></ConfirmModal>
            ) : (
              <Button
                type="button"
                onClick={() => handleUsePassword(password)}
                className="btn-secondary btn-long"
              >
                Use Password
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default PasswordGenerator;
