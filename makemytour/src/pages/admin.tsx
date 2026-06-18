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

  const getBaseUrl = () => {
    return typeof window !== "undefined" ? `http://${window.location.hostname}:8080` : "http://localhost:8080";
  };

  const loadInventory = async () => {
    try {
      const flightRes = await axios.get(`${getBaseUrl()}/flight`);
      setFlights(Array.isArray(flightRes.data) ? flightRes.data : []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadInventory(); }, [activeTab]);

  const handleAddFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🚀 String Packing Bypass Hack: Pack routing information metadata directly into delayReason field
      const packedRouteData = `${from}==>${to}==>${price}`;
      await axios.post(`${getBaseUrl()}/admin/flight`, {
        flightId: flightName,
        status: "On Time",
        delayReason: packedRouteData
      });
      setFlightName(""); setFrom(""); setTo(""); setPrice("");
      loadInventory();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">Admin Inventory Management</h1>
        <div className="flex space-x-4 mb-8">
          <Button onClick={() => setActiveTab("flights")} variant={activeTab === "flights" ? "default" : "outline"}>Manage Flights</Button>
        </div>

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

                  // 🚀 Unpack meta tags data pipeline logic seamlessly
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
      </div>
    </div>
  );
}