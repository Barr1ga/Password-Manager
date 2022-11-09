import {
  format,
  formatDistanceToNow,
  differenceInDays,
  differenceInCalendarWeeks,
  isYesterday,
  isThisWeek,
  toDate,
} from "date-fns";

const formatDateTimeFromFirebase = (firebaseDate) => {
  const exactDate = new Date(
    firebaseDate._seconds * 1000 + firebaseDate._nanoseconds / 1000000
  );
  return toDate(firebaseDate);
};

export const formatDate = (firebaseDate) => {
  const date = formatDateTimeFromFirebase(firebaseDate);

  if (isThisWeek(date)) {
    if (isYesterday(date)) {
      return format(date, "'Yesterday at' p").toString();
    }

    return format(date, "eeee 'at' p").toString();
  }

  if (differenceInCalendarWeeks(new Date(), date) === 1) {
    return format(date, "'Last' eeee 'at' p").toString();
  }

  return format(date, "P").toString();
};

export const formatToTime = (firebaseDate) => {
  const exactDate = formatDateTimeFromFirebase(firebaseDate);
  const formattedTime = format(exactDate, "p");
  return formattedTime;
};

export const formatToTimeDate = (date) => {
  const formattedDate = format(new Date(date), "p");
  return formattedDate;
};

export const formatToNowDate = (date) => {
  const formattedDate = formatDistanceToNow(new Date(date));
  return formattedDate;
};

export const daysDifference = (startDate, endDate) => {
  const difference = differenceInDays(new Date(endDate), new Date(startDate));

  return difference;
};
