import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use your environment variable for the base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: { "Content-Type": "application/json" },
});

export default instance;
