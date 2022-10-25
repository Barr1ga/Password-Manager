import axios from "axios";

const key = process.env.REACT_APP_BRANDFETCH_API_KEY;

const getFolders = async (data) => {
  const { folder } = data;

  const config = {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };

  const response = await axios.get(
    "" + folder,
    config
  );

  const returnData = {
    data: response.data,
  };

  return returnData;
};

const foldersService = {
  getFolders,
};

export default foldersService;
