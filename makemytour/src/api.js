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
