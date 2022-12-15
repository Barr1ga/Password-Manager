import axios from "axios";

const API_URL = "api/member";

const getAllMembers = async (data) => {
  const response = await axios.post(API_URL + "/getAllMembers", data);
  return response.data;
};

const createMember = async (data) => {
  const response = await axios.post(API_URL + "/createMember", data);
  return response.data;
};

const updateMember = async (data) => {
  const response = await axios.post(API_URL + "/updateMember", data);
  return response.data;
};

const deleteMember = async (data) => {
  const response = await axios.post(API_URL + "/deleteMember", data);
  return response.data;
};

const updateMemberRoles = async (data) => {
  const response = await axios.post(API_URL + "/updateMemberRoles", data);
  return response.data;
};

const assignMultipleMemberRole = async (data) => {
  const response = await axios.post(
    API_URL + "/assignMultipleMemberRole",
    data
  );
  return response.data;
};

const unAssignMultipleMemberRole = async (data) => {
  const response = await axios.post(
    API_URL + "/unAssignMultipleMemberRole",
    data
  );
  return response.data;
};

const kickMember = async (data) => {
  const response = await axios.post(API_URL + "/kickMember", data);
  return response.data;
};

const memberService = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
  updateMemberRoles,
  assignMultipleMemberRole,
  unAssignMultipleMemberRole,
  kickMember,
};

export default memberService;
