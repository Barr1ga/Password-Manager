import React from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi";
import TextareaAutosize from "react-textarea-autosize";

const EnterMessage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      //   sex: "",
    },
  });

  return (
    <div className="enter-message">
      <form>
        <div className="form-group form-message-group">
          <TextareaAutosize
            {...register("message")}
            className="form-control"
            minRows={1}
            maxRows={3}
            placeholder="Aa"
          />
          <HiPaperAirplane className="send"></HiPaperAirplane>
        </div>
      </form>
    </div>
  );
};

export default EnterMessage;
