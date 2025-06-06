export default function Sidebar() {
  return (
    <aside className="sidebar">
      <section className="portfolio-card">
        <h3>Your Portfolio</h3>
        <div className="tabs">
          <button className="active">Holdings</button>
          <button>Performance</button>
        </div>
        <div className="total-value">
          <span>Total Value</span>
          <h2 style={{ fontSize: "1rem" }}>$47,715.90</h2>
        </div>
        <ul className="assets">
          <li>
            <div className="coin-info">
              <strong>BTC</strong>
              <span>0.5 BTC</span>
            </div>
            <div className="coin-value">
              <strong>$32,716.11</strong>
              <span className="green">▲ 2.34%</span>
            </div>
          </li>
          {/* Add more coins */}
        </ul>
        <button className="add-btn">Add New Asset</button>
      </section>
      <section className="trending-coins">
        <h3>Trending Coins</h3>
        <ul>
          <li>
            <span>1</span> Bitcoin <span className="green">▲ 2.34%</span>
          </li>
          <li>
            <span>2</span> Ethereum <span className="red">▼ 1.23%</span>
          </li>
          <li>
            <span>3</span> Solana <span className="green">▲ 5.67%</span>
          </li>
        </ul>
      </section>
    </aside>
  );
}
