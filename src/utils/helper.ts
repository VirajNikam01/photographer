export const generateUniqueId = () => {
  const uniqueId = Math.random().toString(26).substring(2);
  const currentTime = Date.now().toString(26);

  return uniqueId + currentTime;
};

export const getDateNTime = () => {
  const now = new Date();

  // Get the current date
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  // Get the current day of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];

  // Get the current time
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

// Format the current date and time
const formattedDate = `${year}-${month}-${date}`;
const formattedTime = `${hours}:${minutes}:${seconds}`;

 return{day : day, date: formattedDate, time:formattedTime}
};
