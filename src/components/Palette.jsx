const Palette = ({ colors }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Tu paleta generada:</h2>
      <div className="flex flex-wrap gap-4">
        {colors.map((color, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-lg shadow-md mb-2"
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-sm font-mono text-gray-700">{color}</span>
            <button
              onClick={() => navigator.clipboard.writeText(color)}
              className="mt-1 text-xs text-blue-600 hover:text-blue-800"
            >
              Copiar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Palette;