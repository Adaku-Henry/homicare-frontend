const dispatchProvider = (service, emergency = false, blacklist = []) => {
  const providers = [
    { id: 1, name: "John Cleaner", service: "Cleaning", rating: 4.8, distance: 2, available: true, phone: "256700000001" },
    { id: 2, name: "Sarah Electrician", service: "Electrical", rating: 4.6, distance: 5, available: true, phone: "256700000002" },
    { id: 3, name: "Plumber Pro", service: "Plumbing", rating: 4.7, distance: 3, available: false, phone: "256700000003" },
    { id: 4, name: "FastCare Team", service: "Cleaning", rating: 4.9, distance: 1, available: true, phone: "256700000004" }
  ];

  const pool = providers.filter(p =>
    p.service.toLowerCase().includes(service.toLowerCase()) &&
    p.available &&
    !blacklist.includes(p.id)
  );

  const scored = pool.map(p => ({
    ...p,
    score:
      (p.rating * 12) +
      ((10 - p.distance) * 3) +
      (emergency ? 15 : 0)
  }));

  const sorted = scored.sort((a, b) => b.score - a.score);

  const best = sorted[0] || null;

  console.log("🧠 DISPATCH SELECTED:", best);

  return best;
};