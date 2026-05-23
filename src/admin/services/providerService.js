export const getProviders = async () => {
  const res = await fetch("/api/providers");
  return res.json();
};

export const updateProviderStatus = async (id, status) => {
  const res = await fetch(`/api/providers/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const deleteProvider = async (id) => {
  const res = await fetch(`/api/providers/${id}`, {
    method: "DELETE",
  });
  return res.json();
};