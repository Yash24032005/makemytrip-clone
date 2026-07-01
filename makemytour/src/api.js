import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

export const getflight = async () => {
    try { return (await axios.get(`${API_BASE_URL}/flight`)).data; }
    catch(e) { return [
        { id: "FL-MOCK-1", flightName: "Air India AI-101", fromCity: "Delhi", toCity: "Mumbai", price: 4999 },
        { id: "FL-MOCK-2", flightName: "IndiGo 6E-204", fromCity: "Delhi", toCity: "Bangalore", price: 5899 }
    ]; }
};

export const gethotel = async () => {
    try { return (await axios.get(`${API_BASE_URL}/hotel`)).data; }
    catch(e) { return [
        { id: "HT-MOCK-1", hotelName: "The Taj Mahal Palace", location: "Mumbai", pricePerNight: 12500 },
        { id: "HT-MOCK-2", hotelName: "Goa Premium Resort", location: "Goa", pricePerNight: 7499 }
    ]; }
};

export const signup = async (f, l, e, p, pwd) => ({ id: "mock-uid", firstName: f, lastName: l, email: e, bookings: [] });
export const login = async (e, p) => ({ id: "mock-uid", firstName: "Yash", lastName: "Bansal", email: e, bookings: [] });
export const editprofile = async (id, f, l, e, p) => ({ id, firstName: f, lastName: l, email: e });
export const cancelBooking = async (id, r) => ({ id, status: "CANCELLED", refundStatus: "PENDING" });
