import axios from "axios";

const key = process.env.REACT_APP_BRANDFETCH_API_KEY;

const getBrandDetails = async (brand) => {
  console.log("tests");
  const config = {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };

  const response = await axios.get(
    "https://api.brandfetch.io/v2/search/" + brand, config
  );
  return response.data;
};

const brandsService = {
  getBrandDetails,
};

export default brandsService;
