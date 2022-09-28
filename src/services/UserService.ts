import axiosInstance from "../api/axiosInstance";

// send request to express, create new user
export const register = async (userCredentials: any) =>
  await axiosInstance.post("/user", userCredentials);
