import axios from "axios";

const key = process.env.REACT_APP_BRANDFETCH_API_KEY;

const API_URL = "api/item";

const getAllItems = async (data) => {
  const response = await axios.post(API_URL + "/getAllItems", data);
  return response.data;
};

const createItem = async (data) => {
  const response = await axios.post(API_URL + "/createItem", data);
  return response.data;
};

const passwordService = {
  getAllItems,
  createItem,
};

export default passwordService;
