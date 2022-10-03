import axiosInstance from "../api/axiosInstance";

// send request to express, create new user
export const register = async (userCredentials: any) =>
  await axiosInstance.post("/user", userCredentials);

// authenticate user with jsonwebtoken
export const login = async (userCredentials: any) =>
  await axiosInstance.post("/user/authenticate", userCredentials);

// get new access token, store new refresh token in db
export const refreshToken = async (rt: any) =>
  await axiosInstance.get("/user/refreshToken", {
    headers: {
      Authorization: `Bearer ${rt}`,
    },
  });
