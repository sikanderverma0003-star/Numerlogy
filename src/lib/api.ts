// Shared API base URL for auth and other backend calls (from env in Vite)
export const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";
