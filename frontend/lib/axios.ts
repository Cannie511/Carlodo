import axios from "axios";

const BASE_URL = process.env.MODE==='development' ? "http://localhost:2205/api" : "/api"

export const api = axios.create({
    baseURL: BASE_URL,
})