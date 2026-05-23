import { useEffect, useState } from "react";

/**
 * SIMPLE LOCAL ADDRESS STORE (NO BACKEND YET)
 */
export const useAddress = () => {
  const [addresses, setAddresses] = useState([]);

  // load initial data
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(stored);
  }, []);

  // save helper
  const saveToStorage = (data) => {
    localStorage.setItem("addresses", JSON.stringify(data));
  };

  // add address
  const add = (address) => {
    const newList = [
      ...addresses,
      { id: Date.now(), ...address }
    ];
    setAddresses(newList);
    saveToStorage(newList);
  };

  // remove address
  const remove = (id) => {
    const newList = addresses.filter((a) => a.id !== id);
    setAddresses(newList);
    saveToStorage(newList);
  };

  // update address
  const update = (id, data) => {
    const newList = addresses.map((a) =>
      a.id === id ? { ...a, ...data } : a
    );
    setAddresses(newList);
    saveToStorage(newList);
  };

  return {
    addresses,
    add,
    remove,
    update,
  };
};