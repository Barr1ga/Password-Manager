import axios from "axios";

const API_URL = "api/auditLog";

const getAllLogs = async (data) => {
  const response = await axios.post(API_URL + "/getAllLogs", data);
  return response.data;
};

const createLog = async (data) => {
  const response = await axios.post(API_URL + "/createLog", data);
  return response.data;
};

const passwordService = {
  getAllLogs,
  createLog,
};

export default passwordService;
