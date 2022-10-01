import React from "react";
import { useSelector } from "react-redux";
import formatDate from "../../features/utils/formatToNowDate";
import formatToTimeDate from "../../features/utils/formatToTimeDate";

const Message = ({ sameSender, message }) => {
  const { members } = useSelector((state) => state.members);
  const sender = members.find((member) => member.id === message.senderID);

  return (
    <>
      <div className="message padding-side">
        {message.isReply && (
          <div className="reply">
            <div className="pointer">
              <div className="line"></div>
            </div>
            <div className="replied-message">
              <div className="image">{sender.name.charAt(0)}</div>
              <small>
                <b>@horebb</b> This is a replied message
              </small>
            </div>
          </div>
        )}
        <div>
          {message.isReply && (
            <div className="user">
              <div className="image">{sender.name.charAt(0)}</div>
            </div>
          )}

          {!message.isReply && !sameSender && (
            <div className="user">
              <div className="image">{sender.name.charAt(0)}</div>
            </div>
          )}

          {!message.isReply && sameSender && (
            <div className="user-alternative">
              <small className="date">
                {formatToTimeDate(message.createdAt)}
              </small>
              <br></br>
            </div>
          )}
          <div className="message-text">
            {!sameSender && (
              <div className="name">
                <p>
                  <b>{sender.name}</b>{" "}
                  <small>{formatDate(message.createdAt)}</small>
                </p>
              </div>
            )}

            <p>{message.message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
