import React, { useState } from "react";
import { useParams } from "react-router-dom";
import servicesData from "../../services/servicesData";
import Navbar from "../../components/common/Navbar";
import { createBooking } from "../../services/api";

import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

function ServiceDetails() {
  const { id } = useParams();
  const service = servicesData.find((s) => s.id === parseInt(id));

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirmBooking = async () => {
    setLoading(true);

    try {
      const bookingData = {
        service: service.id,
        date,
        time,
      };

      await createBooking(bookingData);

      toast.success("Booking successful 🎉");
      setModalOpen(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>{service.name}</h1>
        <p>{service.description}</p>
        <h3>{service.price}</h3>

        {/* Booking Inputs */}
        <div style={{ marginTop: "30px" }}>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button
            onClick={() => setModalOpen(true)}
            style={{
              marginTop: "20px",
              background: "#f97316",
              color: "white",
              padding: "12px 25px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Book Service
          </button>
        </div>

        {/* 🔥 CONFIRMATION MODAL */}
        <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
          <h2>Confirm Booking</h2>

          <p><strong>Service:</strong> {service.name}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>

          <button onClick={handleConfirmBooking}>
            {loading ? "Booking..." : "Confirm"}
          </button>

          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </Modal>
      </div>
    </div>
  );
}

export default ServiceDetails;