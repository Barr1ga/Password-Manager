import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, daysDifference } from "../utils/date";
import { useParams } from "react-router-dom";
import SiteWarning from "../components/SiteWarning";
import VaultMembers from "../components/members/VaultMembers";
import EmptyList from "../assets/empty-list.svg";
import {
  getAllNotifications,
  updateNotification,
} from "../features/slice/notificationSlice";
import Notification from "../components/notifications/Notification";

const Notifications = () => {
  const route = "/Notifications";
  const { notifications } = useSelector((state) => state.notifications);
  const { selectedItem } = useSelector((state) => state.items);

  const { authUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const scrollRef = useRef();
  console.log(notifications);

  useEffect(() => {
    notifications?.forEach((notification) => {
      if (notification.seen === false) {
        dispatch(
          updateNotification({
            uid: authUser.uid,
            notificationUid: notification.uid,
            notificationData: {
              seen: true,
            },
          })
        );
      }
    });
    // dispatch();
  }, []);

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
          <h4>Notifications</h4>
        </div>
        <div className="conversation-section">
          <div className="conversation-list">
            <div className="scroll-view standard-stack gap-10">
              {notifications.length === 0 && (
                <div className="empty-list">
                  <img src={EmptyList} alt={"emptyList"}></img>
                  <p>No messages yet</p>
                </div>
              )}
              {notifications.map((notification, idx) => {
                const difference =
                  idx !== 0
                    ? daysDifference(
                        notifications[idx - 1]?.date,
                        notification?.date
                      )
                    : 0;

                console.log(difference);

                return (
                  <div key={idx}>
                    {idx === 0 ? (
                      <div className="date-separator">
                        <hr></hr>
                        <small>{formatDate(notification?.date)}</small>
                        <hr></hr>
                      </div>
                    ) : (
                      difference >= 1 && (
                        <div className="date-separator">
                          <hr></hr>
                          <small>{formatDate(notification?.date)}</small>
                          <hr></hr>
                        </div>
                      )
                    )}

                    <Notification notification={notification}></Notification>
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
