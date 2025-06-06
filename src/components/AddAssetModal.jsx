// components/AddAssetModal.jsx
import { useState } from "react";

export default function AddAssetModal({ coins, onAdd, onClose }) {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    if (!selectedCoin || quantity <= 0) {
      alert("Select a coin and enter a valid quantity");
      return;
    }
    onAdd(selectedCoin, parseFloat(quantity));
  };

  return (
    <div className="add-asset-modal">
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <h3>Add New Asset</h3>

        <div className="form-group">
          <label>Select Coin</label>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
          >
            <option value="">Select a coin</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            min="0"
            step="0.000001"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <button className="add-btn" onClick={handleSubmit}>
          Add to Portfolio
        </button>
      </div>
    </div>
  );
}
