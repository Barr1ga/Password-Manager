import React, { useState, useEffect } from "react";
import AddItemButton from "../components/AddItemButton";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineViewGrid,
  HiOutlineServer,
  HiOutlineSearch,
  HiOutlineX,
} from "react-icons/hi";
import Button from "react-bootstrap/Button";
import { getAllItems, getTypeSpecific } from "../features/slice/itemSlice";
import ItemsListLazyLoad from "../components/items/ItemsListLazyLoad";
import CardsListLazyLoad from "../components/items/CardsListLazyLoad";
import ItemsList from "../components/items/ItemsList";
import CardsList from "../components/items/CardsList";
import { useParams } from "react-router-dom";
import CurrentItem from "../components/items/CurrentItem";
import SiteWarning from "../components/SiteWarning";
import VaultMembers from "../components/members/VaultMembers";

const Notifications = () => {
  const route = "/Types/Notifications";
  const { items, selectedItem, itemLoading } = useSelector(
    (state) => state.items
  );
  const {notifications} = useSelector((state) => state.notifications);
  const currentPage = "Notifications";
  let { uid } = useParams();

  const { authUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) {
      dispatch(getTypeSpecific({ uid: authUser.uid, type: currentPage }));
    }
  }, []);

  return (
    <>
      <div
        className={
          selectedItem ? "sub-margin-left hide-sub-margin" : "sub-margin-left"
        }
      >
        <div className="page-header page-header-long page-header-fixed padding-side">
          <h4>Notifications</h4>
        </div>
        <div className="conversation-section">
          <div className="conversation-list">
            <div className="scroll-view standard-stack">
              {notifications.length === 0 && (
                <div className="empty-list">
                  <img src={EmptyList} alt={"emptyList"}></img>
                  <p>No messages yet</p>
                </div>
              )}
              {notifications.map((message, idx) => {
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
                    {idx == 0 ? (
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

export default Notifications;
