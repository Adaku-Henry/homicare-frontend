import React, { createContext, useContext, useEffect, useState } from "react";
import { getNotifications, saveNotifications } from "../services/notificationService";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications]);

  const pushNotification = (message, type = "system") => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        pushNotification,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};