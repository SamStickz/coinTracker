import React, { useState, useEffect } from "react";
import styles from "./Controls.module.css";

export default function Controls({
  allCoins,
  onFilteredData,
  onTimeframeChange,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [timeframe, setTimeframe] = useState("24h");

  useEffect(() => {
    let filtered = [...allCoins];

    if (search) {
      filtered = filtered.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "top") {
      filtered = filtered.slice(0, 10);
    } else if (filter === "gainers") {
      filtered.sort(
        (a, b) =>
          b[`price_change_percentage_${timeframe}_in_currency`] -
          a[`price_change_percentage_${timeframe}_in_currency`]
      );
    } else if (filter === "losers") {
      filtered.sort(
        (a, b) =>
          a[`price_change_percentage_${timeframe}_in_currency`] -
          b[`price_change_percentage_${timeframe}_in_currency`]
      );
    }

    if (sortBy === "price") {
      filtered.sort((a, b) => b.current_price - a.current_price);
    } else if (sortBy === "market-cap") {
      filtered.sort((a, b) => b.market_cap - a.market_cap);
    } else if (sortBy === "24h-change") {
      filtered.sort(
        (a, b) =>
          b[`price_change_percentage_${timeframe}_in_currency`] -
          a[`price_change_percentage_${timeframe}_in_currency`]
      );
    }

    onFilteredData(filtered);
    onTimeframeChange(timeframe);
  }, [search, filter, sortBy, timeframe, allCoins]);

  return (
    <div className="bg-white dark:bg-[#1f2937] text-black dark:text-white rounded-lg p-4 my-4 shadow">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#111827] text-black dark:text-white"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#111827] text-black dark:text-white"
        >
          <option value="">Filter</option>
          <option value="top">Top Coins</option>
          <option value="gainers">Top Gainers</option>
          <option value="losers">Top Losers</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#111827] text-black dark:text-white"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="market-cap">Market Cap</option>
          <option value="24h-change">24h %</option>
        </select>
      </div>

      <div className="flex gap-3 flex-wrap">
        {["1h", "24h", "7d", "30d"].map((t) => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              timeframe === t
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
