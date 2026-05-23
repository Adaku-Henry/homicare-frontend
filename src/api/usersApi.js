import { useState, useEffect } from "react";
import {
  getTickets,
  createTicket,
} from "../api/support";

export default function useSupport() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await getTickets();
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const create = async (data) => {
    try {
      await createTicket(data);
      loadTickets();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    tickets,
    loadTickets,
    create,
  };
}