import axios from "axios";

const key = process.env.REACT_APP_BRANDFETCH_API_KEY;

const getBrandDetails = async (brand, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };

  const response = await axios.get(
    "https://api.brandfetch.io/v2/search/" + brand,
    config
  );

  const returnData = {
    data: response.data,
    id,
  };

  return returnData;
};

const brandsService = {
  getBrandDetails,
};

export default brandsService;
