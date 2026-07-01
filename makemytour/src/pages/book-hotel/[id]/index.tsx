import React from "react";
import { useRouter } from "next/router";
import { CreditCard, Building } from "lucide-react";
import PricingEngine from "@/components/PricingEngine";
import ReviewSection from "@/components/ReviewSection";

export default function HotelCheckout() {
  const router = useRouter();
  const { name, location, price, id } = router.query;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBooking = {
      id: "BK-HT-" + Math.floor(Math.random() * 900 + 100),
      type: "Hotel",
      bookingId: "H" + Math.floor(Math.random() * 90000 + 10000),
      date: new Date().toISOString().split('T')[0],
      totalPrice: Number(price) || 8999,
      status: "BOOKED",
      details: { name: name || "Premium Stay", location: location || "Goa", nights: 3 }
    };

    const existing = JSON.parse(localStorage.getItem("local_bookings") || "[]");
    localStorage.setItem("local_bookings", JSON.stringify([...existing, newBooking]));

    alert(`💳 Stay Secured for ${name || "Hotel"}! Mapped to profile repository.`);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 text-black">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-600"><CreditCard /> Secure Hotel Payment</h2>
          <PricingEngine />
          <form onSubmit={handlePayment} className="mt-6 space-y-4">
            <input type="text" placeholder="Cardholder Name" defaultValue="YASH BANSAL" className="w-full border p-2.5 rounded-lg font-medium bg-gray-50" required />
            <input type="text" placeholder="Card Number" className="w-full border p-2.5 rounded-lg font-medium" required />
            <div className="grid grid-cols-2 gap-4"><input type="text" placeholder="MM/YY" className="border p-2.5 rounded-lg text-center" required /><input type="password" placeholder="CVV" className="border p-2.5 rounded-lg text-center" required /></div>
            <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-bold py-3 rounded-lg transition">Confirm Stay (₹{price || "8,999"})</button>
          </form>
          <div className="mt-6 border-t pt-4"><ReviewSection targetId={id} /></div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 border border-gray-200 h-fit">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-1"><Building className="w-4 h-4 text-green-500"/> Stay Summary</h3>
          <div className="space-y-2 text-sm text-gray-600 border-t pt-2">
            <p><strong>Hotel Name:</strong> {name || "Premium Hotel"}</p>
            <p><strong>Location:</strong> {location || "Goa"}</p>
            <div className="border-t pt-2 mt-4 font-bold text-gray-900 flex justify-between"><span>Amount:</span><span className="text-green-700">₹{price || "8,999"}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}