import { format } from "date-fns";
import { formatDistanceToNow } from "date-fns";

export const handleTableColumnDateFormat = (apiDate) => {
  const date = new Date(apiDate);

  // Define options for formatting the date
  const options = { day: "numeric", month: "short", year: "numeric" };

  // Use Intl.DateTimeFormat to format the date
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

export const getCurrentData = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getCurrentTimeInApiFormat = () => {
  const currentDate = new Date(); // Get the current date and time

  // Get the components of the date
  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(currentDate.getUTCDate()).padStart(2, "0");
  const hours = String(currentDate.getUTCHours()).padStart(2, "0");
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(currentDate.getUTCMilliseconds()).padStart(
    3,
    "0"
  );

  // Format the date string
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  return formattedDate;
};

export const formatPostDate = (dateString, currentLanguage) => {
  const arabicMonths = {
    January: "يناير",
    February: "فبراير",
    March: "مارس",
    April: "أبريل",
    May: "مايو",
    June: "يونيو",
    July: "يوليو",
    August: "أغسطس",
    September: "سبتمبر",
    October: "أكتوبر",
    November: "نوفمبر",
    December: "ديسمبر",
  };
  if (!dateString) return ""; // Check if dateString exists

  // Remove microseconds (anything after the '.' before the 'Z')
  const cleanDateString = dateString.split(".")[0] + "Z";

  const date = new Date(cleanDateString);

  if (currentLanguage === "ar") {
    // Format the date in English (Gregorian) format
    const optionsDate = {
      day: "numeric",
      month: "long", // Use 'long' to get the full month name
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", optionsDate);

    // Replace the English month with Arabic month
    const arabicDate = formattedDate.replace(
      /January|February|March|April|May|June|July|August|September|October|November|December/g,
      (month) => arabicMonths[month]
    );

    // Format the time in Arabic with 'ص' for AM and 'م' for PM
    const optionsTime = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    // Manually replace AM/PM with Arabic characters
    const formattedTime = date
      .toLocaleTimeString("ar-SA", optionsTime)
      .replace("AM", "ص")
      .replace("PM", "م");

    return `${arabicDate}، ${formattedTime}`;
  } else {
    // Default to English format
    return format(date, "d MMMM, h:mm a"); // Make sure 'date-fns' is correctly imported
  }
};

export const formatTime = (apiTime) => {
  if (apiTime === null) {
    return;
  }
  const date = new Date(apiTime);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
// this functin to get time in this format 1h ago
export const formatTimeAgo = (timestamp) => {
  const date = new Date(timestamp);
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });

  // this library but word about in the resposne so this to Remove "about" from the string
  return relativeTime.replace(/^about\s/, "");
};
