import axios from "axios";

const API_URL = "api/folder";

const getAllFolders = async (data) => {
  const response = await axios.post(API_URL + "/getAllFolders", data);
  return response.data;
};

const createFolder = async (data) => {
  const response = await axios.post(API_URL + "/createFolder", data);
  return response.data;
};

const updateFolder = async (data) => {
  const response = await axios.post(API_URL + "/updateFolder", data);
  return response.data;
};

const deleteFolder = async (data) => {
  const response = await axios.post(API_URL + "/deleteFolder", data);
  return response.data;
};

const folderService = {
  getAllFolders,
  createFolder,
  updateFolder,
  deleteFolder,
};

export default folderService;