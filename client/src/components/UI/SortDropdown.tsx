import { useRef, useState } from "react";
import { UseClickOutside } from "../../hooks/UseClickOutside";

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Following");
  const options = ["Following", "Popular", "New"];
  const ref = useRef<HTMLDivElement>(null);

  UseClickOutside(ref, () => setIsOpen(false));
  return (
    <div className="relative inline-block text-left">
      {/* Кнопка-триггер */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between min-w-[140px] px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none"
      >
        <span>{selected}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Выпадающее меню */}

      {isOpen && (
        <div
          ref={ref}
          className="absolute left-0 mt-2 w-56 origin-top-left bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-2"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setIsOpen(false);
                setSelected(option);
              }}
              className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-xl transition-colors
                ${selected === option ? "bg-gray-100 " : "hover:bg-gray-50"}`}
            >
              {option}

              {selected === option && (
                <svg
                  className="w-4 h-4 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
