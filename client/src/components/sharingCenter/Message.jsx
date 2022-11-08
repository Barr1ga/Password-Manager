import React from "react";
import { useSelector } from "react-redux";
import { formatToMonthDayYearDate, formatToTimeDate } from "../../utils/date";
import MessageLazyLoad from "./MessageLazyLoad";

const Message = ({ sameSender, message }) => {
  const { members } = useSelector((state) => state.members);
  const sender = members.find((member) => member.id === message.senderID);

  // if (true) {
  //   return <MessageLazyLoad></MessageLazyLoad>
  // }

  return (
    <>
      <button type="button" className="message padding-side">
        {message.isReply && (
          <div className="reply">
            <div className="pointer">
              <div className="line"></div>
            </div>
            <div className="replied-message">
              <div className="image">{sender.username.charAt(0)}</div>
              <small>
                <b>@horebb</b> This is a replied message
              </small>
            </div>
          </div>
        )}
        <div>
          {message.isReply && (
            <div className="user">
              <div className="image">{sender.username.charAt(0)}</div>
            </div>
          )}

          {!message.isReply && !sameSender && (
            <div className="user">
              <div className="image">{sender.username.charAt(0)}</div>
            </div>
          )}

          {!message.isReply && sameSender && (
            <div className="user-alternative"></div>
          )}

          <div className="message-text">
            {!sameSender && (
              <div className="name">
                <p>
                  <b>{sender.username}</b>{" "}
                  <small>{formatToMonthDayYearDate(message.createdAt)}</small>
                </p>
              </div>
            )}
            {!message.isReply && sameSender && (
              <div className="trailing">
                <small className="date">
                  {formatToTimeDate(message.createdAt)}
                </small>
                <br></br>
              </div>
            )}
            <p>{message.message}</p>
          </div>
        </div>
      </button>
    </>
  );
};

export default Message;
