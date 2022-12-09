import axios from "axios";

const API_URL = "api/notification";

const getAllNotifications = async (data) => {
  const response = await axios.post(API_URL + "/getAllNotifications", data);
  return response.data;
};

const createNotification = async (data) => {
  const response = await axios.post(API_URL + "/createNotification", data);
  return response.data;
};

const updateNotification = async (data) => {
  const response = await axios.post(API_URL + "/updateNotification", data);
  return response.data;
};

const deleteNotification = async (data) => {
  const response = await axios.post(API_URL + "/deleteNotification", data);
  return response.data;
};

const notificationService = {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
};

export default notificationService;