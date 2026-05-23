import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {

  // ================= CORE BOOKING STATE =================
  const [booking, setBooking] = useState({
    service: null,
    subService: null,

    provider: null,

    mode: null, // voice | video | audio | whatsapp | visit

    schedule: {
      date: "",
      time: "",
    },

    location: {
      address: "",
      latitude: null,
      longitude: null,
    },

    pricing: {
      basePrice: 0,
      extraFees: 0,
      discount: 0,
      total: 0,
    },

    notes: "",

    status: "idle",
    // idle | selecting | scheduled | confirmed | in-progress | completed | cancelled

    payment: {
      method: "wallet",
      paid: false,
    },
  });

  // ================= UI STATE =================
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  // ================= SET SERVICE =================
  const selectService = (service) => {
    setBooking((prev) => ({
      ...prev,
      service,
      status: "selecting",
    }));
  };

  const selectSubService = (subService) => {
    setBooking((prev) => ({
      ...prev,
      subService,
    }));
  };

  // ================= PROVIDER =================
  const selectProvider = (provider) => {
    setBooking((prev) => ({
      ...prev,
      provider,
    }));
  };

  // ================= MODE =================
  const setMode = (mode) => {
    setBooking((prev) => ({
      ...prev,
      mode,
    }));
  };

  // ================= SCHEDULE =================
  const setSchedule = (date, time) => {
    setBooking((prev) => ({
      ...prev,
      schedule: { date, time },
    }));
  };

  // ================= LOCATION =================
  const setLocation = (location) => {
    setBooking((prev) => ({
      ...prev,
      location,
    }));
  };

  // ================= NOTES =================
  const setNotes = (notes) => {
    setBooking((prev) => ({
      ...prev,
      notes,
    }));
  };

  // ================= PRICING ENGINE =================
  const calculatePrice = () => {
    const base = booking.service?.price || 0;
    const extra = booking.mode === "video" ? 5000 : 0;
    const discount = booking.payment.method === "wallet" ? 1000 : 0;

    const total = base + extra - discount;

    setBooking((prev) => ({
      ...prev,
      pricing: {
        basePrice: base,
        extraFees: extra,
        discount,
        total,
      },
    }));
  };

  // ================= NEXT STEP =================
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // ================= RESET =================
  const resetBooking = () => {
    setBooking({
      service: null,
      subService: null,
      provider: null,
      mode: null,
      schedule: { date: "", time: "" },
      location: { address: "", latitude: null, longitude: null },
      pricing: { basePrice: 0, extraFees: 0, discount: 0, total: 0 },
      notes: "",
      status: "idle",
      payment: { method: "wallet", paid: false },
    });

    setStep(1);
  };

  // ================= CONFIRM BOOKING =================
  const confirmBooking = () => {
    setBooking((prev) => ({
      ...prev,
      status: "confirmed",
    }));

    localStorage.setItem("current_booking", JSON.stringify(booking));
  };

  // ================= PROVIDER FILTER HELPERS =================
  const filters = {
    byService: (providers) =>
      providers.filter((p) => p.service === booking.service?.name),

    byLocation: (providers) =>
      providers.filter((p) => p.location === booking.location.address),

    byRating: (providers) =>
      providers.sort((a, b) => b.rating - a.rating),
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,

        step,
        setStep,

        loading,
        setLoading,

        selectService,
        selectSubService,

        selectProvider,
        setMode,

        setSchedule,
        setLocation,

        setNotes,

        calculatePrice,

        nextStep,
        prevStep,

        resetBooking,
        confirmBooking,

        filters,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};