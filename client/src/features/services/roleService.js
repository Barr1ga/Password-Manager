import axios from "axios";

const API_URL = "api/role";

const getAllRoles = async (data) => {
  const response = await axios.post(API_URL + "/getAllRoles", data);
  return response.data;
};

const createRole = async (data) => {
  const response = await axios.post(API_URL + "/createRole", data);
  return response.data;
};

const updateRole = async (data) => {
  const response = await axios.post(API_URL + "/updateRole", data);
  return response.data;
};

const deleteRole = async (data) => {
  const response = await axios.post(API_URL + "/deleteRole", data);
  return response.data;
};

const roleService = {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
};

export default roleService;
