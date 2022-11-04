import axios from "axios";

const key = process.env.REACT_APP_BRANDFETCH_API_KEY;
const API_URL = "api/item";

const getAllItems = async (data) => {
  const response = await axios.post(API_URL + "/getAllItems", data);
  return response.data;
};

const getFavorites = async (data) => {
  const response = await axios.post(API_URL + "/getFavorites", data);
  return response.data;
};

const getTrash = async (data) => {
  const response = await axios.post(API_URL + "/getTrash", data);
  return response.data;
};

const getTypeSpecific = async (data) => {
  const response = await axios.post(API_URL + "/getTypeSpecific", data);
  return response.data;
};

const getFolderSpecific = async (data) => {
  const response = await axios.post(API_URL + "/getFolderSpecific", data);
  return response.data;
};

const createItem = async (data) => {
  const response = await axios.post(API_URL + "/createItem", data);
  return response.data;
};

const updateItem = async (data) => {
  const response = await axios.post(API_URL + "/updateItem", data);
  return response.data;
};

const passwordService = {
  getAllItems,
  getFavorites,
  getTrash,
  getTypeSpecific,
  getFolderSpecific,
  createItem,
  updateItem,
};

export default passwordService;
