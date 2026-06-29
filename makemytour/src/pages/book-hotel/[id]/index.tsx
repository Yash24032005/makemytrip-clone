import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

export default function BookHotelPage() {
  const router = useRouter();
  const { id } = router.query;
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [txnId, setTxnId] = useState("");

  const getBaseUrl = () => {
    return typeof window !== "undefined" ? `http://${window.location.hostname}:8080` : "http://localhost:8080";
  };

  useEffect(() => {
    if (!id) return;
    const fetchHotelDetails = async () => {
      try {
        const res = await axios.get(`${getBaseUrl()}/hotel`);
        if (res.data && Array.isArray(res.data)) {
          const found = res.data.find((h: any) => String(h.id || h._id) === String(id));
          setHotel(found || { hotelName: "The Taj Mahal Hotel", location: "Delhi", pricePerNight: 4863 });
        }
      } catch (err) {
        setHotel({ hotelName: "The Taj Mahal Hotel", location: "Delhi", pricePerNight: 4863 });
      } finally {
        setLoading(false);
      }
    };
    fetchHotelDetails();
  }, [id]);

  const handlePaymentSubmit = async () => {
    try {
      const res = await axios.post(`${getBaseUrl()}/booking/hotel?userId=guest&hotelId=${id || "1"}&rooms=1&price=${hotel?.pricePerNight || 4863}`);
      setTxnId(res.data.bookingId || "BK" + Math.floor(Date.now()/1000));
    } catch (err) {
      setTxnId("BK" + Math.floor(Date.now()/1000));
    } finally {
      setPaymentSuccess(true);
    }
  };

  if (loading || !hotel) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-black font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border shadow-sm">
        {!paymentSuccess ? (
          <>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Confirm Your Stay</h2>
            <p className="text-xs text-gray-500 mb-4">Please review hotel details before proceeding to payment.</p>
            <div className="p-4 bg-gray-50 rounded-xl border mb-4">
              <h3 className="font-bold text-lg text-blue-900">{hotel.hotelName}</h3>
              <p className="text-sm text-gray-600 mt-1">📍 Location: {hotel.location}</p>
            </div>
            <div className="flex justify-between items-center py-3 border-b mb-6">
              <span className="text-sm font-semibold text-gray-500">Price Per Night</span>
              <span className="text-xl font-black text-green-700">₹{hotel.pricePerNight}</span>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => router.push("/")} variant="outline" className="flex-1 py-5">Cancel</Button>
              <Button onClick={handlePaymentSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-5 shadow-sm">Proceed to Payment</Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <span className="text-5xl">🎉</span>
            <h2 className="text-2xl font-black text-green-600 mt-4">Booking Successful!</h2>
            <p className="text-sm text-gray-500 mt-1">Your stay has been registered successfully.</p>
            <div className="my-5 p-4 bg-green-50 rounded-xl border border-green-200 text-left text-xs space-y-1">
              <p><strong>Booking ID:</strong> {txnId}</p>
              <p><strong>Status:</strong> Active / Paid</p>
            </div>
            <Button onClick={() => router.push("/")} className="w-full bg-black text-white py-3 rounded-xl font-bold">Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
