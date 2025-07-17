import { useState } from "react";

export default function OrderButton({ onOrderChange }) {
  const [currentOrder, setCurrentOrder] = useState("none");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      value: "none",
      label: "Sin ordenamiento",
      buttonLabel: "Ordenar",
    },
    {
      value: "az",
      label: "Orden alfabético (A → Z)",
      buttonLabel: "A-Z ↓",
    },
    {
      value: "za",
      label: "Orden alfabético inverso (Z → A)",
      buttonLabel: "Z-A ↓",
    },
    {
      value: "rating_asc",
      label: "Rating (menor a mayor)",
      buttonLabel: "Rating ↑",
    },
    {
      value: "rating_desc",
      label: "Rating (mayor a menor)",
      buttonLabel: "Rating ↓",
    },
  ];

  const selectedOption =
    options.find((opt) => opt.value === currentOrder) || options[0];

  const handleSelect = (value) => {
    setCurrentOrder(value);
    setIsOpen(false);
    onOrderChange(value);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-[#f87171] text-white rounded-lg hover:bg-red-600  dark:bg-violet-800 dark:hover:bg-violet-950 transition-colors flex items-center"
      >
        {selectedOption.buttonLabel}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-60 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                currentOrder === option.value
                  ? "bg-blue-100  d dark:bg-violet-950 text-blue-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
