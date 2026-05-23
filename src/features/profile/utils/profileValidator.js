export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePhone = (phone) => {
  return phone.length >= 9;
};