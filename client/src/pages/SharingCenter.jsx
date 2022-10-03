import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/sharingCenter/Message";
import formatDate from "../utils/formatToMonthDayYearDate";
import EnterMessage from "../components/sharingCenter/EnterMessage";

const SharingCenter = () => {
  const route = "/SharingCenter";
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.sharing);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [scrollRef]);

  return (
    <div className="margin-content">
      <div className="page-header page-header-long page-header-fixed padding-side">
        <h4>Sharing Center</h4>{" "}
      </div>
      <div className="conversation-list">
        <div className="scroll-view standard-stack">
          {conversations.map((message, idx) => {
            let sameSender = false;
            if (conversations[idx - 1]?.senderID === message.senderID) {
              sameSender = true;
            }
            return (
              <div key={idx}>
                {true && (
                  <div className="date-separator">
                    <hr></hr>
                    <small>
                      <b>{formatDate(message.createdAt)}</b>
                    </small>
                    <hr></hr>
                  </div>
                )}

                <Message sameSender={sameSender} message={message}></Message>
              </div>
            );
          })}
          <div ref={scrollRef}></div>
        </div>
      </div>
      <EnterMessage></EnterMessage>
    </div>
  );
};

export default SharingCenter;
