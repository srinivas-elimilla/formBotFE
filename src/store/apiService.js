export const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://formbot-be.onrender.com/api";
