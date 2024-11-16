import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:5000/api",
  auth: {
    username: process.env.NEXT_PUBLIC_FLEXIBASE_ADMIN_USER!,
    password: process.env.NEXT_PUBLIC_FLEXIBASE_ADMIN_PASSWORD!,
  },
});
