import axios from "axios"
import.meta.env.VITE_APP_API_URL
const api = axios.create({
    baseURL: "process.env.REACT_APP_API_URL || http://localhost:8000/api/v1",
    withCredentials : true,
})

export default api;
