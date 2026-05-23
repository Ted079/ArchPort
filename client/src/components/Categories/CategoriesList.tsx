import { CATEGRIES } from "../../utils/constants";
import SortDropdown from "../UI/SortDropdown";
import { useNavigate, useParams } from "react-router-dom";

interface CategoriesListProps {
  onCategorySelect?: (category: string | null) => void;
  activeCategory?: string | null;

  sort?: string;
  onSortChange?: (value: string | null) => void;
}

const CategoriesList = ({
  onCategorySelect,
  activeCategory,
  sort = "-createdAt",
  onSortChange,
}: CategoriesListProps) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const selectCategory = activeCategory ?? category;

  const handleSortChange = (value: string) => {
    const isMainPage = location.pathname === "/";
    if (isMainPage) {
      navigate(`/categories/sort=${value}`);
    } else {
      onSortChange?.(value);
    }
  };

  return (
    <div className="max-w-full px-16  py-4">
      <div className=" lg:flex lg:items-center flex justify-between cursor-pointer  rounded-3xl   flex-col md:flex-row gap-3 sm:gap-4 p-5  ">
        <div className="flex">
          <SortDropdown
            sortValue={sort}
            // onChange={(value) => onSortChange?.(value)}
            onChange={handleSortChange}
          />
        </div>
        <div className="flex overflow-x-auto overflow-y-hidden md:justify-center">
          {CATEGRIES.map((categoryName) => {
            const isActive =
              selectCategory?.toLowerCase() ===
              categoryName.value.toLowerCase();
            return (
              <button
                key={categoryName.value}
                onClick={() => {
                  const newValue = isActive ? null : categoryName.value;

                  if (activeCategory !== undefined) {
                    onCategorySelect?.(newValue);
                  } else {
                    const targetPath = isActive
                      ? "/categories"
                      : `/categories/${categoryName.value}`;
                    navigate(targetPath);
                  }
                }}
                className={`h-8 px-6 py-2 text-sm font-semibold rounded-full transition-all 
              ${
                isActive
                  ? "bg-neutral-200  shadow-lg"
                  : "bg-transparent hover:text-gray-500"
              }`}
              >
                {categoryName.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
