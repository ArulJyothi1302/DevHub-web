export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:7777"
    : import.meta.env.VITE_API_URL;
