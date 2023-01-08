import axiosInstance from "../api/axiosInstance";

export const getEvents = async (at: any) => {
  return await axiosInstance.get("/event", {
    headers: { Authorization: `Bearer ${at}` },
  });
};

export const createEvent = async (at: any, eventData: any) => {
  return await axiosInstance.post("/event", eventData, {
    headers: { Authorization: `Bearer ${at}` },
  });
};

export const getEvent = async (at: any, title: any) => {
  return await axiosInstance.get(`/event/${title}`, {
    headers: { Authorization: `Bearer ${at}` },
  });
};

export const deleteEvent = async (at: any, id: any) => {
  return await axiosInstance.delete(`/event/${id}`, {
    headers: { Authorization: `Bearer ${at}` },
  });
};
