import React, { useState, useEffect } from "react";
import { User, Mail, LogOut, Plane, Building2, Calendar, MapPin } from "lucide-react";
import { useRouter } from "next/router";
import RefundTracker from "@/components/RefundTracker";

export default function ProfileIndex() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    // Dynamically query data stream from local memory schema
    const stored = localStorage.getItem("local_bookings");
    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      // Clean fallback template schema
      const initialMock = [
        { id: "BK-FL-101", type: "Flight", bookingId: "F123456", date: "2026-07-01", totalPrice: 5499, status: "BOOKED", details: { from: "Delhi", to: "Mumbai", airline: "IndiGo" } }
      ];
      localStorage.setItem("local_bookings", JSON.stringify(initialMock));
      setBookings(initialMock);
    }
  }, []);

  const handleCancelClick = (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: "CANCELLED" } : b);
    setBookings(updated);
    localStorage.setItem("local_bookings", JSON.stringify(updated));
    alert("Success: Dynamic status flag updated to CANCELLED!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 px-4 text-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow p-6 h-fit border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Active Session Details</h2>
          <div className="space-y-2 mb-6">
            <p className="text-sm font-semibold flex items-center gap-2"><User className="w-4 h-4 text-blue-600" /> Yash Bansal</p>
            <p className="text-xs text-gray-600 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-500" /> yash@galgotias.edu</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">My Bookings & Cancellation Hub</h2>
          <div className="space-y-6">
            {bookings.map((booking: any, idx: number) => (
              <div key={booking.id || idx} className="border border-gray-200 rounded-xl p-5 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-3">
                    {booking.type === "Flight" ? (
                      <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Plane className="w-5 h-5"/></div>
                    ) : (
                      <div className="bg-green-50 p-2 rounded-lg text-green-600"><Building2 className="w-5 h-5"/></div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900">{booking.type} - {booking.details?.airline || booking.details?.name}</h3>
                      <p className="text-xs text-gray-400">ID: {booking.bookingId}</p>
                    </div>
                  </div>
                  <span className="text-lg font-extrabold text-green-700">₹{booking.totalPrice}</span>
                </div>
                
                <div className="flex gap-4 text-xs text-gray-500 mb-4 border-b pb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/>{booking.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/>{booking.details?.from || booking.details?.location} {booking.details?.to ? `→ ${booking.details.to}` : ""}</span>
                  <span className={`ml-auto font-bold px-2 py-0.5 rounded text-[10px] ${booking.status === "CANCELLED" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{booking.status}</span>
                </div>

                <RefundTracker booking={booking} />
                
                {booking.status !== "CANCELLED" && (
                  <button onClick={() => handleCancelClick(booking.id)} className="w-full mt-3 text-sm bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition">
                    Send Real-time Cancel Trigger
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}