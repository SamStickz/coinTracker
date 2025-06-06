import logo from "../../assets/cointrackerlogo.png";

export default function Header({ onToggleDark, isDark }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="CoinTracker Logo"
          className="w-6 h-6 object-contain"
        />
        <span className="font-bold text-gray-900 dark:text-white text-lg">
          CoinTracker
        </span>
      </div>

      <button
        onClick={onToggleDark}
        className="text-xl text-gray-700 dark:text-yellow-400 hover:text-yellow-500 transition"
        title="Toggle Theme"
      >
        <span role="img" aria-label="theme-icon">
          {isDark ? "☀️" : "🌙"}
        </span>
      </button>
    </header>
  );
}
