import API from "./axios";

export const getTickets = () => API.get("/support/");
export const createTicket = (data) => API.post("/support/");
export const getTicketDetails = (id) => API.get(`/support/${id}/`);