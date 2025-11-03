import { isToday, isYesterday, format } from "date-fns";

export const formatCreatedAt = (dateString: string) => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Today, ${format(date, "h:mm a")}`; // e.g., 7:23 PM
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, "h:mm a")}`; // e.g., Yesterday, 7:23 PM
  } else {
    return format(date, "MMM d, yyyy, h:mm a"); // e.g., Nov 1, 2025, 7:23 PM
  }
};
