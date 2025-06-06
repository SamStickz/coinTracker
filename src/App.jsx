import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Controls from "./components/Controls/Controls";
import CoinTable from "./components/CoinTable/CoinTable";
import Portfolio from "./components/Portfolio/Portfolio";
import "./App.css";



  
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [allCoins, setAllCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [displayedCoins, setDisplayedCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeframe, setTimeframe] = useState("24h");
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  // Fetch coins from CoinGecko
  const fetchCoins = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h,24h,7d,30d"
      );
      const data = await res.json();
      setAllCoins(data);
      setFilteredCoins(data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch data", err);
      setError("Failed to fetch coin data. Try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * coinsPerPage;
    const end = start + coinsPerPage;
    setDisplayedCoins(filteredCoins.slice(start, end));
  }, [filteredCoins, currentPage]);

  const handleRefresh = () => {
    fetchCoins();
  };

  const handleTimeframeChange = (frame) => {
    setTimeframe(frame);
  };

  const handleFilter = (newFilteredData) => {
    setFilteredCoins(newFilteredData);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 min-h-screen">
        <Header
          onToggleDark={() => setDarkMode((prev) => !prev)}
          isDark={darkMode}
        />
        <Controls
          allCoins={allCoins}
          onFilteredData={handleFilter}
          onTimeframeChange={handleTimeframeChange}
        />

        <div className="layout-container px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
          <main className="main-content flex-1 space-y-8">
            {loading ? (
              <p className="text-center">Loading coins...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <>
                <CoinTable coins={displayedCoins} timeframe={timeframe} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </>
            )}
          </main>

          <div className="w-full md:w-[320px]">
            <Portfolio coins={allCoins} />
          </div>
        </div>
      </div>
    </div>
  );
  
}

// Pagination component
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="mt-10 flex justify-center items-center gap-4 flex-wrap w-full">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-5 py-2 rounded-full text-sm font-semibold shadow transition-all duration-200
          ${
            currentPage === 1
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-yellow-500 text-black hover:bg-yellow-600"
          }`}
      >
        ⬅ Previous
      </button>

      <span className="text-white text-sm font-medium">
        Page <span className="font-bold">{currentPage}</span> of{" "}
        <span className="font-bold">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-5 py-2 rounded-full text-sm font-semibold shadow transition-all duration-200
          ${
            currentPage === totalPages
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-yellow-500 text-black hover:bg-yellow-600"
          }`}
      >
        Next ➡
      </button>
    </div>
  );
}
