import { useState } from "react";

const ColorPicker = ({ baseColor, onColorChange, onGenerate }) => {
  const [color, setColor] = useState(baseColor);

  const handleChange = (e) => {
    setColor(e.target.value);
    onColorChange(e.target.value); // Notifica al componente padre
  };

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Elige un color base:
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="color"
          value={color}
          onChange={handleChange}
          className="w-16 h-16 cursor-pointer"
        />
        <span className="text-gray-700">{color}</span>
        <button
          onClick={onGenerate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Generar paleta
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;