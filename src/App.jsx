import { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import Palette from "./components/Palette";
import Preview from "./components/Preview";

function App() {
  const [baseColor, setBaseColor] = useState("#3B82F6"); // Color inicial (azul de Tailwind)
  const [palette, setPalette] = useState([]); // Paleta generada

  // Función para generar la paleta (simulada por ahora)
  const generatePalette = () => {
    // Aquí luego llamarás a la API de IA/colores
    const mockPalette = [
      baseColor,
      "#93C5FD",
      "#1D4ED8",
      "#EFF6FF",
      "#1E40AF",
    ];
    setPalette(mockPalette);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Generador de Paletas con IA</h1>
        <p className="text-gray-600">Elige un color y genera una paleta armónica</p>
      </header>

      {/* Selector de color */}
      <ColorPicker 
        baseColor={baseColor}
        onColorChange={(color) => setBaseColor(color)}
        onGenerate={generatePalette}
      />

      {/* Paleta generada */}
      {palette.length > 0 && (
        <>
          <Palette colors={palette} />
          <Preview colors={palette} />
        </>
      )}
    </div>
  );
}

export default App;