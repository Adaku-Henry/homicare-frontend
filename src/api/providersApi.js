export const updateProvider = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8000/api/provider/update/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Update failed");
  }

  return result;
};