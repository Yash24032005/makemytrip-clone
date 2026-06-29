import axios from "axios";

const API_BASE_URL = "https://makemytrip-clone-17hl.onrender.com";

export const getflight = async () => {
    const response = await axios.get(`${API_BASE_URL}/flight`);
    return response.data;
};

export const gethotel = async () => {
    const response = await axios.get(`${API_BASE_URL}/hotel`);
    return response.data;
};

export const addflight = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/admin/flight`, data);
    return response.data;
};

export const addhotel = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/admin/hotel`, data);
    return response.data;
};

// --- Missing Auth & Profile Handlers Fixed Here ---
export const signup = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, data);
    return response.data;
};

export const login = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/user/login`, data);
    return response.data;
};

export const editprofile = async (data) => {
    const response = await axios.put(`${API_BASE_URL}/user/profile`, data);
    return response.data;
};
