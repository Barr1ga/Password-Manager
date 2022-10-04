import { format, formatDistanceToNow, differenceInDays  } from "date-fns";

export const formatToMonthDayYearDate = (date) => {
  const formattedDate = format(new Date(date), 'PP')
  return formattedDate;
};

export const formatToTimeDate = (date) => {
    const formattedDate = format(new Date(date), 'p')
    return formattedDate;
  };

export const formatToNowDate = (date) => {
  const formattedDate = formatDistanceToNow(new Date(date));
  return formattedDate;
};

export const daysDifference = (startDate, endDate) => {
  const difference = differenceInDays(
    new Date(endDate),
    new Date(startDate)
  );

  return difference;
}


