import {
  format,
  formatDistanceToNow,
  differenceInDays,
  differenceInCalendarWeeks,
  isToday,
  isYesterday,
  isThisWeek,
  toDate,
} from "date-fns";

const formatDateTimeFromFirebase = (firebaseDate) => {
  const exactDate = new Date(
    firebaseDate._seconds * 1000 + firebaseDate._nanoseconds / 1000000
  );
  return toDate(exactDate);
};

export const formatDate = (firebaseDate) => {
  const date = formatDateTimeFromFirebase(firebaseDate);

  if (isThisWeek(date)) {
    if (isToday(date)) {
      return format(date, "'Today at' p").toString();
    }

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
  const difference = differenceInDays(
    formatDateTimeFromFirebase(endDate),
    formatDateTimeFromFirebase(startDate)
  );

  return difference;
};

export const daysDifferenceFromNow = (date) => {
  const difference = differenceInDays(
    new Date(),
    formatDateTimeFromFirebase(date)
  );

  return difference;
};
