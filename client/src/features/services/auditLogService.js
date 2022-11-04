import axios from "axios";

const API_URL = "api/auditLog";

const getAllLogs = async (data) => {
  const response = await axios.post(API_URL + "/getAllLogs", data);
  return response.data;
};

const createItemLog = async (data) => {
  const response = await axios.post(API_URL + "/createItemLog", data);
  return response.data;
};

const passwordService = {
  getAllLogs,
  createItemLog,
};

export default passwordService;
