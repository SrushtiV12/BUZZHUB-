import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api": "/api";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Adjust the baseURL as needed
});

export default api;
