import { create } from "zustand";
import { apiUrl } from "./apiService";
import axios from "axios";

export const useUpdateSettings = create((set) => ({
  updateSettings: async (data) => {
    try {
      const response = await axios.put(`${apiUrl}/user/update-profile`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      console.log("response >>>>>>>>>", response);
      return response;
    } catch (error) {
      return { success: false, message: "Network error occurred." };
    }
  },
}));
