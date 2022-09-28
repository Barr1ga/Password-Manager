import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { HiCheckCircle, HiOutlineDuplicate } from "react-icons/hi";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import WarningAlert from "./alerts/WarningAlert";
import ConfirmModal from "./Helpers/ConfirmModal";
import getPassword from "../features/utils/getPassword";

const PasswordGenerator = ({ watchPassword, handleUsePassword }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const [generateEmptyCriteria, setGenerateEmptyCriteria] = useState(false);
  const [generatedEmpty, setGeneratedEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const generatedRef = useRef();
  const clipBoard = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      password: watchPassword,
    },
  });

  const generatedPassword = watch("password");
  console.log(generatedPassword);

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
    const { lowercase, uppercase, numbers, symbols, length } = data;
    if (!lowercase && !uppercase && !numbers && !symbols) {
      setGenerateEmptyCriteria(true);
      return;
    }

    if (generateEmptyCriteria) {
      setGenerateEmptyCriteria(false);
    }

    const returnValue = getPassword(data);
    setValue("password", returnValue);
  };

  const handlePasswordCopied = () => {
    setShowToolTip(true);
    navigator.clipboard.writeText(password);
  };

  const onSubmit = () => {
    console.log(generatedPassword);
    handleUsePassword(generatedPassword);
  };

  return (
    <>
      <div className="generator-header">
        <h5>Password Generator</h5>
      </div>

      <div className="password-generator">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group generator-field">
            <input
              type="text"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              className="form-control password-generator-input"
            ></input>
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
          <div className="form-group">
            {watchPassword === "" ? (
              <Button type="button" className="btn-secondary btn-long" onClick={onSubmit}>
                Use Password
              </Button>
            ) : (
              <>
                <ConfirmModal
                  proceedInteraction={
                    <Button
                      type="button"
                      className="btn-dark btn-long"
                      onClick={onSubmit}
                    >
                      Yes
                    </Button>
                  }
                  component={
                    <Button type="button" className="btn-secondary btn-long">
                      Use Password
                    </Button>
                  }
                  headerMessage={"Are you sure you want to use this password?"}
                  bodyMessage={
                    "You already have a password for this item, do you want to replace it?"
                  }
                ></ConfirmModal>
              </>
            )}
          </div>
        </form>
      </div>

      <form
        className="password-generator-form"
        onSubmit={handlePasswordSubmit(onSubmitGenerate)}
      >
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
        </div>
      </form>
    </>
  );
};

export default PasswordGenerator;
