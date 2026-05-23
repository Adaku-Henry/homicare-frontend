export const notify = (message, type = "info") => {
  console.log(`🔔 [${type.toUpperCase()}]: ${message}`);
};

export const notifySuccess = (msg) => notify(msg, "success");
export const notifyError = (msg) => notify(msg, "error");
export const notifyInfo = (msg) => notify(msg, "info");