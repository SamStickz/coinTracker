import React from "react";

export default function CoinTable({ coins, timeframe }) {
  const getChange = (coin) => {
    switch (timeframe) {
      case "1h":
        return coin.price_change_percentage_1h_in_currency;
      case "7d":
        return coin.price_change_percentage_7d_in_currency;
      case "30d":
        return coin.price_change_percentage_30d_in_currency;
      case "24h":
      default:
        return coin.price_change_percentage_24h;
    }
  };

  return (
    <section className="overflow-x-auto">
      <table className="min-w-[950px] w-full table-auto bg-white dark:bg-[#1e293b] shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-100 dark:bg-[#334155]">
          <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">{timeframe} %</th>
            <th className="px-4 py-3">Market Cap</th>
            <th className="px-4 py-3">Volume (24h)</th>
            <th className="px-4 py-3">Supply</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {coins.map((coin, index) => {
            const change = getChange(coin);
            const changeColor = change >= 0 ? "text-green-500" : "text-red-500";

            return (
              <tr
                key={coin.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img src={coin.image} alt={coin.symbol} className="w-5 h-5" />
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {coin.name}
                  </span>
                  <small className="text-gray-500 dark:text-gray-400">
                    ({coin.symbol.toUpperCase()})
                  </small>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td className={`px-4 py-3 ${changeColor}`}>
                  {change?.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  ${coin.market_cap.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  ${coin.total_volume.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {coin.circulating_supply.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
