let addresses = [];

export const getAddresses = async () => {
  return addresses;
};

export const addAddress = async (address) => {
  addresses.push({ id: Date.now(), ...address });
  return addresses;
};

export const deleteAddress = async (id) => {
  addresses = addresses.filter((a) => a.id !== id);
  return addresses;
};