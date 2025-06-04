import ColorCard from "./ColorCard";

const Palette = ({ colors }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Tu paleta generada:</h2>
      <div className="flex flex-wrap gap-4">
        {colors.map((color, index) => (
          <ColorCard key={`color-${index}`} hex={color} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Palette;