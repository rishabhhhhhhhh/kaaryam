// export const SERVER_URL = "http://localhost:3000";
export const SERVER_URL = "https://kaaryam.vercel.app/";

export function formatTimestamp(timestamp) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

export const capitalizeFirstLetter = (str) => {
  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
