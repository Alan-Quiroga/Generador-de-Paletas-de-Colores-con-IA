import { useState } from "react";

const ColorCard = ({ hex, index }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center transition-transform hover:scale-105">
      <div
        className="w-20 h-20 rounded-lg shadow-md mb-2 cursor-pointer"
        style={{ backgroundColor: hex }}
        onClick={handleCopy}
      ></div>
      <span className="text-sm font-mono text-gray-700">{hex}</span>
      <button
        className={`mt-1 text-xs ${
          isCopied ? "text-green-600" : "text-blue-600 hover:text-blue-800"
        }`}
      >
        {isCopied ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );
};

export default ColorCard;