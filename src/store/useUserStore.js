import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "./apiService";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  isTokenVerified: false,
  elements: [],
  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, formData);
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
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
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
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
    if (!token) return set({ isTokenVerified: true });

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${apiUrl}/auth/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { user } = response.data;
      set({ user, token, loading: false, isTokenVerified: true });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Token verification failed.",
        loading: false,
      });
      toast.error(error.response?.data?.message);
    }
  },
  getAllWorkspaces: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${apiUrl}/user/${id}/all-workspaces`, {
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
    const userId = localStorage.getItem("userId");
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${apiUrl}/user/new-folder`,
        { folderName, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.delete(
        `${apiUrl}/user/${userId}/${id}/delete-folder`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
    const userId = localStorage.getItem("userId");
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${apiUrl}/user/new-form`,
        { userId, formName, folderIndex },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "creating form is failed.",
        loading: false,
      });
      return error;
    }
  },
  deleteForm: async (folderIndex, formId) => {
    set({ loading: true, error: null });
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.delete(
        `${apiUrl}/user/${userId}/${folderIndex}/${formId}/delete-form`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "deleting form is failed.",
        loading: false,
      });
      return error;
    }
  },
  createNewFormBot: async (elements) => {
    let userId = localStorage.getItem("userId");
    let folderIndex = localStorage.getItem("folderIndex");
    let formId = JSON.parse(localStorage.getItem("form"))._id;

    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${apiUrl}/user/form-bot`,
        { userId, formId, folderIndex, elements },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      set({ loading: false, error: null });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "creating form-bot is failed.",
        loading: false,
      });
      return error;
    }
  },
  fetchFormBotById: async (user_Id, folder_Index, form_id) => {
    let userId = user_Id || localStorage.getItem("userId");
    let folderIndex = folder_Index || localStorage.getItem("folderIndex");
    let formId = form_id || JSON.parse(localStorage.getItem("form"))._id;
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${apiUrl}/user/form-bot/${userId}/${folderIndex}/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const formData = response.data;

      set({
        elements: formData?.form?.elements,
        formData,
        loading: false,
        error: null,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "creating form-bot is failed.",
        loading: false,
      });
      return error;
    }
  },
  setElemetsData: (elements) => {
    set({ elements });
  },

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));

export default useUserStore;
