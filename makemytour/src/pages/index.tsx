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
    { title: "Stays in & Around Bangalore", imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800", tag: "TOP 9" },
    { title: "Beach Destinations", imageUrl: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=800", tag: "TOP 11" }
  ];

  const wonders = [
    { title: "Shimla s Best Kept Secret", imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800" },
    { title: "Tamil Nadu s Charming Hill Town", imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800" },
    { title: "Quaint Little Hill Station in Gujarat", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800" },
    { title: "A pleasant summer retreat", imageUrl: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800" }
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

  // 🚀 Dynamic Dropdown Auto-Populate Parser
  const cityOptions = useMemo(() => {
    const cities = new Set<string>();
    (flight || []).forEach((f) => {
      if (f.delayReason && f.delayReason.includes("==>")) {
        const parts = f.delayReason.split("==>");
        if (parts[0]) cities.add(parts[0].trim());
        if (parts[1]) cities.add(parts[1].trim());
      }
      if (f.from) cities.add(f.from);
      if (f.to) cities.add(f.to);
    });
    (hotel || []).forEach((h) => {
      if (h.location) cities.add(h.location);
    });
    return Array.from(cities).map((city) => ({ value: city, label: city }));
  }, [flight, hotel]);

  // 🚀 Core Flight Search Logic Filter Mapping
  const handlesearch = () => {
    if (bookingtype === "flights") {
      const results = (flight || []).filter((f) => {
        if (!f) return false;
        let flightFrom = f.from || "";
        let flightTo = f.to || "";
        
        if (f.delayReason && f.delayReason.includes("==>")) {
          const parts = f.delayReason.split("==>");
          flightFrom = parts[0] || "";
          flightTo = parts[1] || "";
        }
        
        return (
          String(flightFrom).toLowerCase().trim() === String(from || "").toLowerCase().trim() &&
          String(flightTo).toLowerCase().trim() === String(to || "").toLowerCase().trim()
        );
      }).map(f => {
        // Map dynamic virtual tags back onto the card interface parameters
        if (f.delayReason && f.delayReason.includes("==>")) {
          const parts = f.delayReason.split("==>");
          return {
            ...f,
            from: parts[0] || "N/A",
            to: parts[1] || "N/A",
            price: parts[2] || "0"
          };
        }
        return f;
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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-black pb-12" style={{ backgroundImage: "url(\"https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=2940&q=80\")" }}>
      <main className="container mx-auto px-4 py-6">
        <nav className="bg-white rounded-xl shadow-lg mx-auto max-w-5xl mb-6 p-4 overflow-x-auto">
          <div className="flex justify-between items-center min-w-max space-x-8">
            <NavItem icon={<Plane />} text="Flights" active={bookingtype === "flights"} onClick={() => { setbookingtype("flights"); setsearchresult([]); }} />
            <NavItem icon={<Hotel />} text="Hotels" active={bookingtype === "hotels"} onClick={() => { setbookingtype("hotels"); setsearchresult([]); }} />
            <NavItem icon={<HomeIcon />} text="Homestays" />
            <NavItem icon={<Umbrella />} text="Holiday" />
            <NavItem icon={<Train />} text="Trains" />
            <NavItem icon={<Bus />} text="Buses" />
            <NavItem icon={<Car />} text="Cabs" />
            <NavItem icon={<CreditCard />} text="Forex" />
            <NavItem icon={<Shield />} text="Insurance" />
          </div>
        </nav>

        <div className="bg-white rounded-xl shadow-lg mx-auto max-w-5xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {bookingtype === "flights" && (
              <div className="col-span-1">
                <SearchSelect options={cityOptions} placeholder="From" value={from} onChange={setfrom} icon={<MapPin className="text-gray-400" />} subtitle="Enter city or airport" />
              </div>
            )}
            <div className="col-span-1">
              <SearchSelect options={cityOptions} placeholder={bookingtype === "flights" ? "To" : "City"} value={to} onChange={setto} icon={<MapPin className="text-gray-400" />} subtitle={bookingtype === "flights" ? "Enter city or airport" : "Enter city"} />
            </div>
            <div className="col-span-1">
              <SearchInput icon={<Calendar className="text-gray-400" />} placeholder="Date" value={date} onChange={(e: any) => setdate(e.target.value)} subtitle="Select a date" type="date" />
            </div>
            <div className="col-span-1">
              <SearchInput icon={<Users className="text-gray-400" />} placeholder="Travelers" value={travelers.toString()} onChange={(e: any) => settravelers(parseInt(e.target.value) || 1)} subtitle="Number of travelers" type="number" />
            </div>
            <Button className="col-span-1 h-[46px] bg-blue-600 hover:bg-blue-700 text-white font-bold" onClick={handlesearch}>SEARCH</Button>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Search Results</h2>
            {searchresults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchresults.map((result, idx) => (
                  <div key={result.id || result._id || idx} className="bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col justify-between">
                    {bookingtype === "flights" ? (
                      <>
                        <div>
                          <p className="font-semibold text-lg text-gray-900">Flight Name: {result.flightName || result.flightId}</p>
                          <h3 className="font-semibold text-md text-gray-700 mt-1">{result.from} to {result.to}</h3>
                          <p className="text-gray-600 text-xs mt-2">Status: {result.status || "On Time"}</p>
                        </div>
                        <div className="mt-4 border-t pt-3 flex justify-between items-center">
                          <span className="text-xl font-bold text-green-700">₹{result.price}</span>
                          <Button size="sm" className="bg-black text-white hover:bg-gray-800 font-bold px-4" onClick={() => handlebooknow(result.id || result._id || idx)}>Book Now</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{result.hotelName}</h3>
                          <p className="text-gray-600 text-sm mt-1">City: {result.location}</p>
                        </div>
                        <div className="mt-4 border-t pt-3 flex justify-between items-center">
                          <span className="text-xl font-bold text-green-700">₹{result.pricePerNight} /night</span>
                          <Button size="sm" className="bg-black text-white hover:bg-gray-800 font-bold px-4" onClick={() => handlebooknow(result.id || result._id || idx)}>Book Now</Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-sm">No {bookingtype} available for the selected criteria.</p>
            )}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 bg-white/90 p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-8 text-black">Best Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={offer.imageUrl} alt={offer.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
                  <p className="text-gray-600 text-sm">{offer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 bg-white/90 p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-8 text-black">Handpicked Collections for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <img src={collection.imageUrl} alt={collection.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-black text-sm font-semibold px-2 py-1 rounded">{collection.tag}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-semibold">{collection.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 bg-white/90 p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-8 text-black">Unlock Lesser-Known Wonders of India</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wonders.map((wonder, index) => (
              <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <img src={wonder.imageUrl} alt={wonder.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-semibold">{wonder.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DownloadApp />
      </main>
    </div>
  );
}

const DownloadApp = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto my-12 text-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Download App Now!</h3>
          <p className="text-gray-600 mb-4">Get India s #1 travel super app with best deals on flights</p>
          <div className="flex space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-10" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <QrCode className="w-24 h-24" />
          <p className="text-sm text-gray-600">Scan QR code to download the app</p>
        </div>
      </div>
    </div>
  );
};

function NavItem({ icon, text, active = false, onClick }: any) {
  return (
    <button className={`flex flex-col items-center p-2 rounded-lg transition-colors \${active ? "text-blue-500 font-bold" : "text-gray-600 hover:text-blue-500"}`} onClick={onClick}>
      {icon}
      <span className="text-sm mt-1 whitespace-nowrap">{text}</span>
    </button>
  );
}

function SearchInput({ icon, placeholder, value, onChange, subtitle, type = "text" }: any) {
  return (
    <div className="border rounded-lg p-3 hover:border-blue-500 cursor-pointer h-full bg-white">
      <div className="flex items-center space-x-2">
        {icon}
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-500 truncate">{placeholder}</div>
          <input type={type} value={value} onChange={onChange} className="font-semibold w-full bg-transparent outline-none text-black text-sm mt-1" placeholder={placeholder} />
          <div className="text-xs text-gray-400 truncate">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}