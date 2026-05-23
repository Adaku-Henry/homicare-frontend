import { useState, useEffect } from "react";
import {
  getNotifications,
  markAsRead,
} from "../api/notifications";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const res = await getNotifications();
    setNotifications(res.data);
  };

  const mark = async (id) => {
    await markAsRead(id);
    loadNotifications();
  };

  return { notifications, loadNotifications, mark };
}