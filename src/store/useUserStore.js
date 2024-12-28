import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "./apiService";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, formData);
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      set({ user, token, loading: false });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed.",
        loading: false,
      });
      return error;
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

      const { user } = response.data;
      set({ user, token, loading: false });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Token verification failed.",
        loading: false,
      });
      toast.error(error.response?.data?.message);
    }
  },
  getAllWorkspaces: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${apiUrl}/user/all-workspaces`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { workspaces } = response.data;

      set({ workspaces, loading: false });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "getting workspaces is failed.",
        loading: false,
      });
      return error;
    }
  },
  createNewFolder: async (folderName) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${apiUrl}/user/new-folder`,
        { folderName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { user } = response.data;

      set({ user, loading: false });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "creating folder is failed.",
        loading: false,
      });
      return error;
    }
  },
  deleteFolder: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(
        `${apiUrl}/user/delete-folder/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { user } = response.data;

      set({ user, loading: false });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "deleting folder is failed.",
        loading: false,
      });
      return error;
    }
  },
  createNewForm: async (formName, folderIndex) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${apiUrl}/user/new-form`,
        { formName, folderIndex },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response >>>>>>", response);

      const { user } = response.data;

      set({ user, loading: false });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "creating form is failed.",
        loading: false,
      });
      return error;
    }
  },

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));

export default useUserStore;
