import SortDropdown from "../UI/SortDropdown";
import { useNavigate } from "react-router-dom";

const CATEGRIES = [
  {
    id: 1,
    value: "",
    label: "All",
  },
  { id: 2, value: "architecture", label: "Architecture" },
  { id: 3, value: "interior", label: "Interior" },
  { id: 4, value: "landscape", label: "Landscape" },
  { id: 5, value: "urban", label: "Urban" },
  { id: 6, value: "industrial", label: "Industrial" },
  { id: 7, value: "renovation", label: "Renovation" },
  { id: 8, value: "conceptual", label: "Conceptual" },
  { id: 10, value: "residential", label: "Residential" },
  { id: 10, value: "commercial", label: "Commercial" },
];

const CategoriesList = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-full px-16  py-4">
      <div className="bg-[#f8f8fc] lg:flex lg:items-center justify-between cursor-pointer border border-[#f8f8fc] rounded-3xl flex  flex-col md:flex-row gap-3 sm:gap-4 p-5  shadow-xs">
        <div className="flex">
          <SortDropdown />
        </div>
        <div className="flex overflow-x-auto overflow-y-hidden md:justify-center">
          {CATEGRIES.map((category) => (
            <button
              onClick={() => navigate(`/categories/${category.value}`)}
              key={category.value}
              className="h-12 px-8 py-2 text-sm text-center   font-semibold bg-transparent   sm:text-sm  whitespace-nowrap focus:outline-none"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
