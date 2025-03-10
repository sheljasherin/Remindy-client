import axios from "axios";

const SERVER_BASE_URL = "http://localhost:5000/admin";

export const loginAdmin = (email, password) => 
    axios.post(`${SERVER_BASE_URL}/login`, { email, password })
        .then(res => res.data);
