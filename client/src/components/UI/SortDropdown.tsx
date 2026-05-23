import { useRef, useState } from "react";
import { UseClickOutside } from "../../hooks/UseClickOutside";

interface SortDropdownProps {
  sortValue: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ sortValue, onChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = [
    { label: "Popular", value: "-views" },
    { label: "Newest", value: "-createdAt" },
    { label: "Oldest", value: "createdAt" },
  ];

  const selected =
    options.find((o) => o.value === sortValue)?.label ?? "Popular";

  const ref = useRef<HTMLDivElement>(null);

  UseClickOutside(ref, () => setIsOpen(false));
  return (
    <div className="relative inline-block text-left">
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

      {isOpen && (
        <div
          ref={ref}
          className="absolute left-0 mt-2 w-56 origin-top-left bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-2"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setIsOpen(false);
                onChange(option.value);
              }}
              className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-xl transition-colors
                ${selected === option.label ? "bg-gray-100 " : "hover:bg-gray-50"}`}
            >
              {option.label}

              {selected === option.label && (
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
