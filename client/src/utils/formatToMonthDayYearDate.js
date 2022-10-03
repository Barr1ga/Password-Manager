import { format } from "date-fns";

const formatDate = (date) => {
  const formattedDate = format(new Date(date), 'PP')
  return formattedDate;
};

export default formatDate;
