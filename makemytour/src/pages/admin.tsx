// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// 
// // import API_URL from "makemytour/src/api/api.js";

// export default function AdminDashboard() {
//   const [flights, setFlights] = useState<any[]>([]);
//   const [hotels, setHotels] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState("flights");

//   const [flightName, setFlightName] = useState("");
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [price, setPrice] = useState("");

//   const [hotelName, setHotelName] = useState("");
//   const [location, setLocation] = useState("");
//   const [pricePerNight, setPricePerNight] = useState("");

//   const loadInventory = async () => {
//     try {
//       const flightRes = await axios.get(`${API_URL}/flight`);
//       setFlights(Array.isArray(flightRes.data) ? flightRes.data : []);
//     } catch (err) { console.error(err); }

//     try {
//       const hotelRes = await axios.get(`${API_URL}/hotel`);
//       setHotels(Array.isArray(hotelRes.data) ? hotelRes.data : []);
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => { loadInventory(); }, [activeTab]);

//   const handleAddFlight = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const packedRouteData = `${from}==>${to}==>${price}`;
//       await axios.post(`${API_URL}/admin/flight`, {
//         flightId: flightName,
//         status: "On Time",
//         delayReason: packedRouteData
//       });
//       setFlightName(""); setFrom(""); setTo(""); setPrice("");
//       loadInventory();
//     } catch (err) { console.error(err); }
//   };

//   const handleAddHotel = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/admin/hotel`, {
//         hotelName, location, pricePerNight: Number(pricePerNight)
//       });
//       setHotelName(""); setLocation(""); setPricePerNight("");
//       loadInventory();
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black font-sans p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-extrabold mb-6">Admin Inventory Management</h1>
        
//         <div className="flex space-x-4 mb-8">
//           <Button onClick={() => setActiveTab("flights")} variant={activeTab === "flights" ? "default" : "outline"}>Manage Flights</Button>
//           <Button onClick={() => setActiveTab("hotels")} variant={activeTab === "hotels" ? "default" : "outline"}>Manage Hotels</Button>
//         </div>

//         {activeTab === "flights" ? (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 border p-6 rounded-xl bg-white shadow-sm">
//               <h2 className="text-xl font-bold mb-4">Current Flights</h2>
//               <div className="divide-y border-t mt-2">
//                 {flights.length === 0 ? (
//                   <p className="text-gray-400 py-4 italic text-sm">No flights found.</p>
//                 ) : (
//                   flights.map((f, i) => {
//                     let displayFrom = "N/A";
//                     let displayTo = "N/A";
//                     let displayPrice = "0";

//                     if (f.delayReason && f.delayReason.includes("==>")) {
//                       const parts = f.delayReason.split("==>");
//                       displayFrom = parts[0] || "N/A";
//                       displayTo = parts[1] || "N/A";
//                       displayPrice = parts[2] || "0";
//                     }

//                     return (
//                       <div key={i} className="py-4 flex justify-between items-center">
//                         <div>
//                           <strong className="text-gray-900 text-lg">{f.flightId || "Dynamic Route"}</strong>
//                           <p className="text-sm text-gray-500 mt-0.5">Route: {displayFrom} → {displayTo}</p>
//                         </div>
//                         <span className="font-extrabold text-green-700 text-lg">₹{displayPrice}</span>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </div>
            
//             <form onSubmit={handleAddFlight} className="border p-6 rounded-xl bg-gray-50 space-y-3 h-fit shadow-sm">
//               <h3 className="font-bold text-lg mb-2">Add New Flight Route</h3>
//               <Input placeholder="Flight Name / ID (e.g. IndiGo)" value={flightName} onChange={e => setFlightName(e.target.value)} required />
//               <Input placeholder="From City (e.g. Delhi)" value={from} onChange={e => setFrom(e.target.value)} required />
//               <Input placeholder="To City (e.g. Mumbai)" value={to} onChange={e => setTo(e.target.value)} required />
//               <Input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
//               <Button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5">Publish Flight</Button>
//             </form>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 border p-6 rounded-xl bg-white shadow-sm">
//               <h2 className="text-xl font-bold mb-4">Current Hotels</h2>
//               <div className="divide-y border-t mt-2">
//                 {hotels.length === 0 ? (
//                   <p className="text-gray-400 py-4 italic text-sm">No hotels found.</p>
//                 ) : (
//                   hotels.map((h, i) => (
//                     <div key={i} className="py-4 flex justify-between items-center">
//                       <div>
//                         <strong className="text-gray-900 text-lg">{h.hotelName}</strong>
//                         <p className="text-sm text-gray-500 mt-0.5">📍 {h.location}</p>
//                       </div>
//                       <span className="font-extrabold text-green-700 text-lg">₹{h.pricePerNight}/night</span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>

//             <form onSubmit={handleAddHotel} className="border p-6 rounded-xl bg-gray-50 space-y-3 h-fit shadow-sm">
//               <h3 className="font-bold text-lg mb-2">Add New Hotel</h3>
//               <Input placeholder="Hotel Name" value={hotelName} onChange={e => setHotelName(e.target.value)} required />
//               <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
//               <Input type="number" placeholder="Price Per Night" value={pricePerNight} onChange={e => setPricePerNight(e.target.value)} required />
//               <Button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5">Publish Hotel</Button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [flights, setFlights] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("flights");

  const [flightName, setFlightName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [price, setPrice] = useState("");

  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");

  
  const BACKEND_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";

  const loadInventory = async () => {
    try {
      const flightRes = await axios.get(`${BACKEND_URL}/flight`);
      setFlights(Array.isArray(flightRes.data) ? flightRes.data : []);
    } catch (err) { console.error(err); }

    try {
      const hotelRes = await axios.get(`${BACKEND_URL}/hotel`);
      setHotels(Array.isArray(hotelRes.data) ? hotelRes.data : []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadInventory(); }, [activeTab]);

  const handleAddFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const packedRouteData = `${from}==>${to}==>${price}`;
      await axios.post(`${BACKEND_URL}/admin/flight`, {
        flightId: flightName,
        status: "On Time",
        delayReason: packedRouteData
      });
      setFlightName(""); setFrom(""); setTo(""); setPrice("");
      loadInventory();
    } catch (err) { console.error(err); }
  };

  const handleAddHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/admin/hotel`, {
        hotelName, location, pricePerNight: Number(pricePerNight)
      });
      setHotelName(""); setLocation(""); setPricePerNight("");
      loadInventory();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">Admin Inventory Management</h1>
        
        <div className="flex space-x-4 mb-8">
          <Button onClick={() => setActiveTab("flights")} variant={activeTab === "flights" ? "default" : "outline"}>Manage Flights</Button>
          <Button onClick={() => setActiveTab("hotels")} variant={activeTab === "hotels" ? "default" : "outline"}>Manage Hotels</Button>
        </div>

        {activeTab === "flights" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 border p-6 rounded-xl bg-white shadow-sm">
              <h2 className="text-xl font-bold mb-4">Current Flights</h2>
              <div className="divide-y border-t mt-2">
                {flights.length === 0 ? (
                  <p className="text-gray-400 py-4 italic text-sm">No flights found.</p>
                ) : (
                  flights.map((f, i) => {
                    let displayFrom = "N/A";
                    let displayTo = "N/A";
                    let displayPrice = "0";

                    if (f.delayReason && f.delayReason.includes("==>")) {
                      const parts = f.delayReason.split("==>");
                      displayFrom = parts[0] || "N/A";
                      displayTo = parts[1] || "N/A";
                      displayPrice = parts[2] || "0";
                    }

                    return (
                      <div key={i} className="py-4 flex justify-between items-center">
                        <div>
                          <strong className="text-gray-900 text-lg">{f.flightId || "Dynamic Route"}</strong>
                          <p className="text-sm text-gray-500 mt-0.5">Route: {displayFrom} → {displayTo}</p>
                        </div>
                        <span className="font-extrabold text-green-700 text-lg">₹{displayPrice}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            
            <form onSubmit={handleAddFlight} className="border p-6 rounded-xl bg-gray-50 space-y-3 h-fit shadow-sm">
              <h3 className="font-bold text-lg mb-2">Add New Flight Route</h3>
              <Input placeholder="Flight Name / ID (e.g. IndiGo)" value={flightName} onChange={e => setFlightName(e.target.value)} required />
              <Input placeholder="From City (e.g. Delhi)" value={from} onChange={e => setFrom(e.target.value)} required />
              <Input placeholder="To City (e.g. Mumbai)" value={to} onChange={e => setTo(e.target.value)} required />
              <Input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
              <Button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5">Publish Flight</Button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 border p-6 rounded-xl bg-white shadow-sm">
              <h2 className="text-xl font-bold mb-4">Current Hotels</h2>
              <div className="divide-y border-t mt-2">
                {hotels.length === 0 ? (
                  <p className="text-gray-400 py-4 italic text-sm">No hotels found.</p>
                ) : (
                  hotels.map((h, i) => (
                    <div key={i} className="py-4 flex justify-between items-center">
                      <div>
                        <strong className="text-gray-900 text-lg">{h.hotelName}</strong>
                        <p className="text-sm text-gray-500 mt-0.5">📍 {h.location}</p>
                      </div>
                      <span className="font-extrabold text-green-700 text-lg">₹{h.pricePerNight}/night</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleAddHotel} className="border p-6 rounded-xl bg-gray-50 space-y-3 h-fit shadow-sm">
              <h3 className="font-bold text-lg mb-2">Add New Hotel</h3>
              <Input placeholder="Hotel Name" value={hotelName} onChange={e => setHotelName(e.target.value)} required />
              <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
              <Input type="number" placeholder="Price Per Night" value={pricePerNight} onChange={e => setPricePerNight(e.target.value)} required />
              <Button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5">Publish Hotel</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
