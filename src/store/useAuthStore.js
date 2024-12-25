import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "./apiService";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, formData);
      console.log("response >>>>>>>>>>", response);

      const { user, token } = response.data;
      localStorage.setItem("token", token);
      set({ user, token, loading: false });
      toast.success("Registration successful!");
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed.",
        loading: false,
      });
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  },
  login: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData);
      console.log("Login response >>>>>>>>>>", response);

      const { user, token } = response.data;
      localStorage.setItem("token", token);
      set({ user, token, loading: false });
      toast.success("Login successful!");
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed.",
        loading: false,
      });
      toast.error(error.response?.data?.message || "Login failed.");
    }
  },
  verifyToken: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${apiUrl}/auth/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Token verification response >>>>>>>>>>", response);

      const { user } = response.data;
      set({ user, token, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Token verification failed.",
        loading: false,
      });
      toast.error(
        error.response?.data?.message || "Token verification failed."
      );
    }
  },
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));

export default useAuthStore;
