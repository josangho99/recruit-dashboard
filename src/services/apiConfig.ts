import axios from "axios";

const API_BASE_URL = "https://recruit.paysbypays.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 요청 타임아웃 10초
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
