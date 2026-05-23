export const createUserProfile = (user) => {
  if (!user || !user.id) return;

  const storageKey = `profile_${user.id}`;

  // prevent overwrite if already exists
  const existing = localStorage.getItem(storageKey);
  if (existing) return;

  const profile = {
    userId: user.id,
    name: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    avatar: user.avatar || "",
    bio: "",
    city: "",
    address: "",
    skills: "",
    experience: "",
    rate: "",
    availability: "",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(storageKey, JSON.stringify(profile));
};