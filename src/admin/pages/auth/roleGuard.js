export const isAdmin = (user) => {
  return user?.role === "admin";
};

export const isProvider = (user) => {
  return user?.role === "provider";
};

export const isUser = (user) => {
  return user?.role === "user";
};