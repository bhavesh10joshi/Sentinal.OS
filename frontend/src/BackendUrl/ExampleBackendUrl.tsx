// Reads from .env file during local dev, falls back to production URL
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://your-sentinel-backend.vercel.app";
