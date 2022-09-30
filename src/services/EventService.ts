import axiosInstance from "../api/axiosInstance";

export const getEvents = async (at: any) => {
  return await axiosInstance.get("/event", {
    headers: { Authorization: `Bearer ${at}` },
  });
};

export const createEvent = async (at: any, eventData: any) => {
  return await axiosInstance.post("/event/create", eventData, {
    headers: { Authorization: `Bearer ${at}` },
  });
};
