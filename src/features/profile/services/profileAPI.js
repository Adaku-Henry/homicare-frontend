export const getProfile = async () => {
  return {
    name: "John Doe",
    email: "john@example.com",
    phone: "0700000000",
  };
};

export const updateProfileAPI = async (data) => {
  console.log("Updating profile:", data);
  return { success: true };
};