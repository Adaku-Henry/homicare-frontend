const API_URL = "http://127.0.0.1:8000/api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const getProfile = async () => {
  const res = await fetch(`${API_URL}/profile/`, {
    headers: headers(),
  });
  return res.json();
};

const updateProfile = async (data) => {
  const res = await fetch(`${API_URL}/profile/update/`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export default {
  getProfile,
  updateProfile,
};