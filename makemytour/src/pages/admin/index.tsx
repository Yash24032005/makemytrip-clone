import { getflight, gethotel } from "@/api";
import Loader from "@/components/Loader";
import { SearchSelect } from "@/components/SearchSelect";
import { Button } from "@/components/ui/button";
import {
  Bus, Calendar, Car, CreditCard, HomeIcon, Hotel, MapPin, Plane, QrCode, Shield, Train, Umbrella, Users,
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [bookingtype, setbookingtype] = useState("flights");
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [date, setdate] = useState("");
  const [travelers, settravelers] = useState(1);
  const [searchresults, setsearchresult] = useState<any[]>([]);
  const [hotel, sethotel] = useState<any[]>([]);
  const [loading, setloading] = useState(true);
  const [flight, setflight] = useState<any[]>([]);
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();

  const offers = [
    { title: "Domestic Flights", description: "Get up to 20% off on domestic flights", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800" },
    { title: "International Hotels", description: "Book luxury hotels worldwide", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800" },
    { title: "Holiday Packages", description: "Exclusive deals on holiday packages", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800" }
  ];

  const collections = [
    { title: "Stays in & Around Delhi", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800", tag: "TOP 8" },
    { title: "Stays in & Around Mumbai", imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800", tag: "TOP 8" },
    { title: "Stays in & Around Bangalore", imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800", tag: "TOP 9" }
  ];

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await gethotel();
        sethotel(data || []);
        const flightdata = await getflight();
        setflight(flightdata || []);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    };
    fetchdata();
  }, [user]);

  const cityOptions = useMemo(() => {
    const cities = new Set<string>();
    (flight || []).forEach((f) => {
      if (f?.from) cities.add(f.from);
      if (f?.to) cities.add(f.to);
    });
    (hotel || []).forEach((h) => {
      if (h?.location) cities.add(h.location);
    });
    return Array.from(cities).map((city) => ({ value: city, label: city }));
  }, [flight, hotel]);

  const handlesearch = () => {
    if (bookingtype === "flights") {
      const results = (flight || []).filter((f) => {
        if (!f) return false;
        const flightFrom = f.from || f.From || "";
        const flightTo = f.to || f.To || "";
        return (
          String(flightFrom).toLowerCase() === String(from || "").toLowerCase() &&
          String(flightTo).toLowerCase() === String(to || "").toLowerCase()
        );
      });
      setsearchresult(results);
    } else if (bookingtype === "hotels") {
      const results = (hotel || []).filter((h) => {
        if (!h) return false;
        const hotelLoc = h.location || h.Location || h.city || "";
        return String(hotelLoc).toLowerCase() === String(to || "").toLowerCase();
      });
      setsearchresult(results);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "Flexible Date";
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const handlebooknow = (id: any) => {
    if (bookingtype === "flights") {
      router.push(`/book-flight/${id}`);
    } else {
      router.push(`/book-hotel/${id}`);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-black pb-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=2940&q=80')" }}>
      <main className="container mx-auto px-4 py-6">
        <nav className="bg-white rounded-xl shadow-lg mx-auto max-w-5xl mb-6 p-4 overflow-x-auto">
          <div className="flex justify-between items-center min-w-max space-x-8">
            <button className={`flex flex-col items-center p-2 rounded-lg ${bookingtype === "flights" ? "text-blue-500 font-bold" : "text-gray-600"}`} onClick={() => { setbookingtype("flights"); setsearchresult([]); }}>
              <Plane /> <span className="text-sm mt-1">Flights</span>
            </button>
            <button className={`flex flex-col items-center p-2 rounded-lg ${bookingtype === "hotels" ? "text-blue-500 font-bold" : "text-gray-600"}`} onClick={() => { setbookingtype("hotels"); setsearchresult([]); }}>
              <Hotel /> <span className="text-sm mt-1">Hotels</span>
            </button>
            <div className="text-gray-400 p-2 text-sm flex items-center space-x-6">
              <span className="flex items-center gap-1"><Train/> Trains</span>
              <span className="flex items-center gap-1"><Bus/> Buses</span>
              <span className="flex items-center gap-1"><Car/> Cabs</span>
            </div>
          </div>
        </nav>

        <div className="bg-white rounded-xl shadow-lg mx-auto max-w-5xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {bookingtype === "flights" && (
              <div className="col-span-1">
                <SearchSelect options={cityOptions} placeholder="From" value={from} onChange={setfrom} icon={<MapPin className="text-gray-400" />} subtitle="Origin City" />
              </div>
            )}
            <div className="col-span-1">
              <SearchSelect options={cityOptions} placeholder={bookingtype === "flights" ? "To" : "City"} value={to} onChange={setto} icon={<MapPin className="text-gray-400" />} subtitle="Destination" />
            </div>
            <div className="col-span-1">
              <label className="text-xs text-gray-400">Departure Date</label>
              <input type="date" value={date} onChange={(e) => setdate(e.target.value)} className="w-full border rounded-lg p-2 mt-1 text-sm h-[46px]" />
            </div>
            <div className="col-span-1">
              <label className="text-xs text-gray-400">Travelers</label>
              <input type="number" value={travelers} onChange={(e) => settravelers(parseInt(e.target.value) || 1)} className="w-full border rounded-lg p-2 mt-1 text-sm h-[46px]" />
            </div>
            <Button className="col-span-1 h-[46px] bg-blue-600 hover:bg-blue-700 text-white font-bold" onClick={handlesearch}>SEARCH</Button>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            {searchresults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchresults.map((result, idx) => (
                  <div key={result.id || result._id || idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col justify-between">
                    {bookingtype === "flights" ? (
                      <>
                        <div>
                          <p className="font-extrabold text-lg text-blue-900">{result.flightName || "IndiGo Airline"}</p>
                          <h3 className="font-semibold text-sm text-gray-700 mt-1">📍 {result.from} → {result.to}</h3>
                          <p className="text-xs text-gray-500 mt-2">Departure: {formatDate(result.departureTime)}</p>
                        </div>
                        <div className="mt-4 border-t pt-3 flex justify-between items-center">
                          <span className="text-xl font-black text-green-700">₹{result.price || "4500"}</span>
                          <Button size="sm" className="bg-black text-white hover:bg-gray-800 font-bold px-4" onClick={() => handlebooknow(result.id || result._id || idx)}>Book Now</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="font-extrabold text-lg text-blue-900">{result.hotelName || "Premium Resort"}</p>
                          <p className="text-sm text-gray-600 mt-1">📍 City: {result.location}</p>
                        </div>
                        <div className="mt-4 border-t pt-3 flex justify-between items-center">
                          <span className="text-xl font-black text-green-700">₹{result.pricePerNight || "4863"}/night</span>
                          <Button size="sm" className="bg-black text-white hover:bg-gray-800 font-bold px-4" onClick={() => handlebooknow(result.id || result._id || idx)}>Book Now</Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">No flights/hotels available for your selection.</p>
            )}
          </div>
        </div>

        {/* Offers Section */}
        <div className="max-w-5xl mx-auto mb-12 bg-white/90 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Offers for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, i) => (
              <div key={i} className="border rounded-xl overflow-hidden bg-white shadow-sm">
                <img src={offer.imageUrl} alt={offer.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{offer.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collections Section */}
        <div className="max-w-5xl mx-auto bg-white/90 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Handpicked Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((col, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden shadow-sm group cursor-pointer">
                <img src={col.imageUrl} alt={col.title} className="w-full h-64 object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="absolute top-4 left-4 bg-orange-500 text-xs font-bold px-2 py-0.5 rounded">{col.tag}</span>
                  <h3 className="font-bold text-lg">{col.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}