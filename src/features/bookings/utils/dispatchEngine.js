export const dispatchProvider = (service, emergency = false, blacklist = []) => {
  const providers = [
    { id: 1, name: "John Cleaner", service: "Cleaning", rating: 4.8, distance: 2, available: true, phone: "256700000001" },
    { id: 2, name: "Sarah Electrician", service: "Electrical", rating: 4.6, distance: 5, available: true, phone: "256700000002" },
    { id: 3, name: "Plumber Pro", service: "Plumbing", rating: 4.7, distance: 3, available: false, phone: "256700000003" }
  ];

  const filtered = providers.filter(p =>
    p.service.toLowerCase().includes(service.toLowerCase()) &&
    p.available &&
    !blacklist.includes(p.id)
  );

  const scored = filtered.map(p => ({
    ...p,
    score: (p.rating * 10) + (10 - p.distance) + (emergency ? 20 : 0)
  }));

  return scored.sort((a, b) => b.score - a.score)[0];
};