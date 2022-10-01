import { formatDistanceToNow } from "date-fns";

const formatToNowDate = (date) => {
  const formattedDate = formatDistanceToNow(new Date(date));
  return formattedDate;
};

export default formatToNowDate;
