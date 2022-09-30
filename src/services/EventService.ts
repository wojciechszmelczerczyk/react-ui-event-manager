import axiosInstance from "../api/axiosInstance";

export const createEvent = async (at: any, eventDate: any) => {
  return await axiosInstance.post(
    "/event/create",
    { eventDate },
    { headers: { Authorization: `Bearer ${at}` } }
  );
};
