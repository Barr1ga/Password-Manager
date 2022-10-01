import { format } from "date-fns";

const formatToTimeDate = (date) => {
  const formattedDate = format(new Date(date), 'p')
  return formattedDate;
};

export default formatToTimeDate;
