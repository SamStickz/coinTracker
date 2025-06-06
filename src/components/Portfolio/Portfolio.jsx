import React, { useState, useEffect } from "react";
import styles from "./Portfolio.module.css";

export default function Portfolio({ coins }) {
  const [portfolio, setPortfolio] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio");
    if (saved) {
      setPortfolio(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const handleAddAsset = () => {
    if (!selectedCoin || !quantity || !buyPrice) return;

    const coinData = coins.find((c) => c.id === selectedCoin);
    if (!coinData) return;

    const existing = portfolio.find((item) => item.id === selectedCoin);
    if (existing) {
      // update quantity & average buy price
      const updated = portfolio.map((item) =>
        item.id === selectedCoin
          ? {
              ...item,
              quantity: parseFloat(item.quantity) + parseFloat(quantity),
              buyPrice: parseFloat(buyPrice),
            }
          : item
      );
      setPortfolio(updated);
    } else {
      setPortfolio([
        ...portfolio,
        {
          id: coinData.id,
          name: coinData.name,
          symbol: coinData.symbol,
          image: coinData.image,
          quantity: parseFloat(quantity),
          buyPrice: parseFloat(buyPrice),
        },
      ]);
    }

    setShowModal(false);
    setSelectedCoin("");
    setQuantity("");
    setBuyPrice("");
  };

  const totalValue = portfolio.reduce((sum, asset) => {
    const coin = coins.find((c) => c.id === asset.id);
    return sum + (coin?.current_price || 0) * asset.quantity;
  }, 0);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <h3>Your Portfolio</h3>
        <div className={styles.totalValue}>
          <span>Total Value</span>
          <h2>${totalValue.toFixed(2)}</h2>
        </div>

        <ul className={styles.assets}>
          {portfolio.map((asset) => {
            const coin = coins.find((c) => c.id === asset.id);
            const currentValue = coin?.current_price * asset.quantity || 0;
            const profitLoss =
              ((coin?.current_price - asset.buyPrice) / asset.buyPrice) * 100;

            return (
              <li key={asset.id}>
                <div className={styles.coinInfo}>
                  <strong>{asset.symbol.toUpperCase()}</strong>
                  <span>
                    {asset.quantity} {asset.symbol.toUpperCase()}
                  </span>
                </div>
                <div className={styles.coinValue}>
                  <strong>${currentValue.toFixed(2)}</strong>
                  <span className={profitLoss >= 0 ? styles.green : styles.red}>
                    {profitLoss >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(profitLoss).toFixed(2)}%
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          Add New Asset
        </button>

        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>Add New Asset</h3>
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
              >
                <option value="">Select Coin</option>
                {coins.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="number"
                placeholder="Buy Price"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
              />
              <div className={styles.modalActions}>
                <button onClick={handleAddAsset}>Add</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
