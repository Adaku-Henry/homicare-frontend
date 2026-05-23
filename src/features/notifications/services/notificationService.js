export const saveNotifications = (data) => {
  localStorage.setItem("notifications", JSON.stringify(data));
};

export const getNotifications = () => {
  return JSON.parse(localStorage.getItem("notifications")) || [];
};