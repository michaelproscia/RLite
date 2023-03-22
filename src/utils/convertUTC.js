export default function convertUTC(utcTimeString) {
  // Convert the UTC time string to a Date object
  const date = new Date(utcTimeString * 1000);

  // Get the number of milliseconds since the date
  const milliseconds = Date.now() - date.getTime();

  // Define the time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // Calculate the time elapsed in each interval
  const intervals = [
    { label: "y", time: year },
    { label: "m", time: month },
    { label: "w", time: week },
    { label: "d", time: day },
    { label: "h", time: hour },
    { label: "min", time: minute },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const elapsed = Math.floor(milliseconds / interval.time);
    if (elapsed >= 1) {
      return `${elapsed}${interval.label} ago`;
    }
  }

  return "just now";
}
