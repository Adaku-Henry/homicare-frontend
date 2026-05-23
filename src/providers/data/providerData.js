export const providersData = [
  {
    id: 1,
    fullName: "John Builder",
    email: "john@example.com",
    phone: "+256700000001",
    service: "Plumbing",
    location: "Kampala",
    rating: 4.5,
    jobsCompleted: 32,
    earnings: 1200000,
    status: "approved",
    bio: "Experienced plumber with 5+ years in residential work.",
    avatar: "",
    verified: true,
    joinedAt: "2025-10-01",
  },

  {
    id: 2,
    fullName: "Sarah CleanPro",
    email: "sarah@example.com",
    phone: "+256700000002",
    service: "Cleaning",
    location: "Entebbe",
    rating: 4.8,
    jobsCompleted: 120,
    earnings: 5600000,
    status: "pending",
    bio: "Professional cleaner for homes and offices.",
    avatar: "",
    verified: false,
    joinedAt: "2025-11-12",
  },

  {
    id: 3,
    fullName: "Mike Electric",
    email: "mike@example.com",
    phone: "+256700000003",
    service: "Electrical",
    location: "Jinja",
    rating: 3.9,
    jobsCompleted: 18,
    earnings: 800000,
    status: "rejected",
    bio: "Electrician specializing in installations and repairs.",
    avatar: "",
    verified: false,
    joinedAt: "2025-09-20",
  },
];

// helper function (VERY IMPORTANT FIX)
export const getProviderById = (id) => {
  return providersData.find((p) => p.id === Number(id));
};