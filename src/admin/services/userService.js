export const getUsers = async () => {
  const res = await fetch("/api/users");
  return res.json();
};

export const updateUserStatus = async (id, status) => {
  const res = await fetch(`/api/users/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  return res.json();
};