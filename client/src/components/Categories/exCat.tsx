import SortDropdown from "../UI/SortDropdown";

// 1. Описываем типы для пропсов (если используете TypeScript)
interface CategoriesListProps {
  activeCategory?: string | null;
  onCategorySelect?: (category: string | null) => void;
}

const CATEGRIES = [
  { id: 2, value: "architecture", label: "Architecture" },
  { id: 3, value: "interior", label: "Interior" },
  { id: 4, value: "landscape", label: "Landscape" },
  { id: 5, value: "urban", label: "Urban" },
  { id: 6, value: "industrial", label: "Industrial" },
  { id: 7, value: "renovation", label: "Renovation" },
  { id: 8, value: "conceptual", label: "Conceptual" },
  { id: 10, value: "residential", label: "Residential" },
  { id: 11, value: "commercial", label: "Commercial" },
];

const CategoriesList = ({ activeCategory, onCategorySelect }: CategoriesListProps) => {
  return (
    <div className="max-w-full px-16 py-4">
      <div className="bg-[#f8f8fc] lg:flex lg:items-center justify-between border border-[#f8f8fc] rounded-3xl flex flex-col md:flex-row gap-3 sm:gap-4 p-5 shadow-xs">
        <div className="flex">
          <SortDropdown />
        </div>
        <div className="flex overflow-x-auto overflow-y-hidden md:justify-center">
          {CATEGRIES.map((category) => {
            // 2. Сравниваем с пропсом, который пришел сверху
            const isActive = category.value === activeCategory;

            return (
              <button
                key={category.id} // Лучше использовать id
                onClick={() => {
                  // 3. Логика toggle: если уже активен - сбрасываем (null), если нет - выбираем
                  const newValue = isActive ? null : category.value;
                  onCategorySelect?.(newValue);
                }}
                className={`h-12 px-8 py-2 text-sm text-center font-semibold whitespace-nowrap focus:outline-none transition-all duration-200 rounded-xl
                  ${isActive 
                    ? "bg-black text-white shadow-md" // Яркий стиль для активного
                    : "bg-transparent text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;