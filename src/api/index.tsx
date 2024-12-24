import axios from "axios";

const adminAuthCreds = {
  username: process.env.NEXT_PUBLIC_FLEXIBASE_ADMIN_USER!,
  password: process.env.NEXT_PUBLIC_FLEXIBASE_ADMIN_PASSWORD!,
};

export const authApi = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  auth: adminAuthCreds,
});

export const dbApi = axios.create({
  baseURL: "http://localhost:5001/api/db",
  auth: adminAuthCreds,
});

export const storageApi = axios.create({
  baseURL: "http://localhost:5002/api/storage",
  auth: adminAuthCreds,
});
