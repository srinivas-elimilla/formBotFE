export const shareFormUrl =
  process.env.NODE_ENV === "production"
    ? "https://srinivas-formbot.vercel.app/"
    : "http://localhost:5173/";
