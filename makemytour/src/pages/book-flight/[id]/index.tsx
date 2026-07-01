import React from "react";
import { useRouter } from "next/router";
import { CreditCard, Plane } from "lucide-react";
import PricingEngine from "@/components/PricingEngine";
import SeatSelection from "@/components/SeatSelection";

export default function FlightCheckout() {
  const router = useRouter();
  const { name, from, to, price } = router.query;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBooking = {
      id: "BK-FL-" + Math.floor(Math.random() * 900 + 100),
      type: "Flight",
      bookingId: "F" + Math.floor(Math.random() * 90000 + 10000),
      date: new Date().toISOString().split('T')[0],
      totalPrice: Number(price) || 5499,
      status: "BOOKED",
      details: { from: from || "Delhi", to: to || "Mumbai", airline: name || "IndiGo" }
    };

    // Store in browser memory to secure against data loss
    const existing = JSON.parse(localStorage.getItem("local_bookings") || "[]");
    localStorage.setItem("local_bookings", JSON.stringify([...existing, newBooking]));

    alert(`💳 Payment Successful for ${name || "Flight"}! Saved to local session.`);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 text-black">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-600"><CreditCard /> Secure Flight Payment</h2>
          <PricingEngine />
          <SeatSelection />
          <form onSubmit={handlePayment} className="mt-6 space-y-4">
            <input type="text" placeholder="Cardholder Name" defaultValue="YASH BANSAL" className="w-full border p-2.5 rounded-lg font-medium bg-gray-50" required />
            <input type="text" placeholder="Card Number" className="w-full border p-2.5 rounded-lg font-medium" required />
            <div className="grid grid-cols-2 gap-4"><input type="text" placeholder="MM/YY" className="border p-2.5 rounded-lg text-center" required /><input type="password" placeholder="CVV" className="border p-2.5 rounded-lg text-center" required /></div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">Pay Now (₹{price || "5,499"})</button>
          </form>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border border-gray-200 h-fit">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-1"><Plane className="w-4 h-4 text-blue-500"/> Trip Details</h3>
          <div className="space-y-2 text-sm text-gray-600 border-t pt-2">
            <p><strong>Flight:</strong> {name || "Fetching..."}</p>
            <p><strong>From:</strong> {from || "Selected Origin"}</p>
            <p><strong>To:</strong> {to || "Selected Destination"}</p>
            <div className="border-t pt-2 mt-4 font-bold text-gray-900 flex justify-between"><span>Amount:</span><span className="text-green-700">₹{price || "5,499"}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}