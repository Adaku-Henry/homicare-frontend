import { dispatchProvider } from "./dispatchEngine";

const simulateResponse = (provider) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const accepted = Math.random() > 0.3;
      resolve(accepted);
    }, 1500);
  });
};

export const dispatchQueue = async (service, emergency = false) => {
  let blacklist = [];

  for (let i = 0; i < 3; i++) {
    const provider = dispatchProvider(service, emergency, blacklist);

    if (!provider) return null;

    const accepted = await simulateResponse(provider);

    if (accepted) return provider;

    blacklist.push(provider.id);
  }

  return null;
};