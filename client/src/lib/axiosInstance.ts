import axios from "axios";
import { API_URL } from "@/utils/config";
import useStore from "@/store/useStore";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; // failed request, allowing it to be retried after handling the error.
    const { token, setCredentials, clearCredentials } = useStore.getState();

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Marks this request as already retried

      if (token) {
        try {
          // Request a new access token using the refresh token
          const { data } = await axiosInstance.get("/api/auth/refresh");

          setCredentials(data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (error) {
          console.log("Session expired");
          clearCredentials();
          return Promise.reject(error);
        }
      }
    }
    if (error.response) {
      error.message = error.response.data.message ?? error.message;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
