// utils/auth.js
import { jwtDecode } from "jwt-decode";

export const GetUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded?.userId || null; // Replace with your actual token payload field
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};
