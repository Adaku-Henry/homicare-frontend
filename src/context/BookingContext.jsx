import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    service: null,
    provider: null,
    mode: null,
    schedule: { date: "", time: "" },
    location: { address: "" },
    notes: "",
    pricing: { total: 0 },
  });

  const [step, setStep] = useState(1);

  // ================= PRICE CALCULATION (STABLE) =================
  const calculatePrice = useCallback(() => {
    const base = booking.service?.price || 0;
    const extra = booking.mode === "video" ? 5000 : 0;

    setBooking((prev) => ({
      ...prev,
      pricing: {
        total: base + extra,
      },
    }));
  }, [booking.service, booking.mode]);

  // ================= UPDATE PRICE AUTOMATICALLY =================
  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  // ================= ACTIONS =================
  const selectService = (service) =>
    setBooking((p) => ({ ...p, service }));

  const selectProvider = (provider) =>
    setBooking((p) => ({ ...p, provider }));

  const selectMode = (mode) =>
    setBooking((p) => ({ ...p, mode }));

  const setSchedule = (date, time) =>
    setBooking((p) => ({
      ...p,
      schedule: { date, time },
    }));

  const setLocation = (location) =>
    setBooking((p) => ({ ...p, location }));

  const setNotes = (notes) =>
    setBooking((p) => ({ ...p, notes }));

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const confirmBooking = useCallback(() => {
    localStorage.setItem(
      "current_booking",
      JSON.stringify(booking)
    );
  }, [booking]);

  // ================= MEMO CONTEXT VALUE =================
  const value = useMemo(
    () => ({
      booking,
      step,
      setStep,
      selectService,
      selectProvider,
      selectMode,
      setSchedule,
      setLocation,
      setNotes,
      calculatePrice,
      nextStep,
      prevStep,
      confirmBooking,
    }),
    [booking, step, calculatePrice, confirmBooking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};