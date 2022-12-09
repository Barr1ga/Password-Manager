import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/sharingCenter/Message";
import { formatDate, daysDifference } from "../utils/date";
import EnterMessage from "../components/sharingCenter/EnterMessage";
import EmptyList from "../assets/empty-list.svg";
import MessageLazyLoad from "../components/sharingCenter/MessageLazyLoad";
import SiteWarning from "../components/SiteWarning";
import VaultMembers from "../components/members/VaultMembers";
import CurrentItem from "../components/items/CurrentItem";

const SharingCenter = () => {
  const route = "/SharingCenter";
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.sharing);
  const { selectedItem } = useSelector((state) => state.items);
  const loading = true;

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [scrollRef]);

  return (
    <>
      <div
        className={
          selectedItem ? "sub-margin-left hide-sub-margin" : "sub-margin-left"
        }
      >
        <div className="page-header page-header-long page-header-fixed padding-side">
          <h4>Sharing Center</h4>{" "}
        </div>
        <div className="conversation-section">
          <div className="conversation-list">
            <div className="scroll-view standard-stack">
              {conversations.length === 0 && (
                <div className="empty-list">
                  <img src={EmptyList} alt={"emptyList"}></img>
                  <p>No messages yet</p>
                </div>
              )}
              {conversations.map((message, idx) => {
                if (loading) {
                  return <MessageLazyLoad></MessageLazyLoad>;
                }

                let sameSender = false;
                if (
                  idx !== 0 &&
                  conversations[idx - 1]?.senderID === message.senderID
                ) {
                  sameSender = true;
                }

                const difference =
                  idx !== 0
                    ? daysDifference(
                        conversations[idx - 1]?.createdAt,
                        message.createdAt
                      )
                    : 0;

                return (
                  <div key={idx}>
                    {idx === 0 ? (
                      <div className="date-separator">
                        <hr></hr>
                        <small>
                          {/* <b>{formatDate(message.createdAt)}</b> */}
                        </small>
                        <hr></hr>
                      </div>
                    ) : (
                      difference >= 1 && (
                        <div className="date-separator">
                          <hr></hr>
                          <small>
                            {/* <b>{formatDate(message.createdAt)}</b> */}
                          </small>
                          <hr></hr>
                        </div>
                      )
                    )}

                    <Message
                      sameSender={sameSender}
                      message={message}
                    ></Message>
                  </div>
                );
              })}
              <div ref={scrollRef}></div>
            </div>
          </div>
          {/* <EnterMessage></EnterMessage> */}
        </div>
      </div>

      <div className="sub-margin-right">
        <div className="scroll-view standard-stack gap-10">
          {selectedItem && (
            <>
              <CurrentItem></CurrentItem>
            </>
          )}

          {!selectedItem && (
            <>
              <SiteWarning></SiteWarning>
              <div className="right-vault-members">
                <VaultMembers></VaultMembers>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SharingCenter;
