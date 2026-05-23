const BASE_URL = "http://127.0.0.1:8000/api/profile/";

export const getProfile = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const updateProfileAPI = async (profile) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  return res.json();
};