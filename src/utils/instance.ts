import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});
