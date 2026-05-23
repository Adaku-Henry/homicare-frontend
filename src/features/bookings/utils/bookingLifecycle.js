export const simulateLifecycle = (bookingId, updateStatus) => {
  const steps = ["Accepted", "On the way", "Arrived", "Completed"];

  steps.forEach((status, i) => {
    setTimeout(() => {
      updateStatus(bookingId, status);
    }, (i + 1) * 2000);
  });
};