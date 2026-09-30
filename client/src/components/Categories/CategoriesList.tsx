import { CATEGRIES } from "../../utils/constants";
import SortDropdown from "../UI/SortDropdown";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "./CategoriesList.css";
// import "swiper/css/navigation";

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
  const location = useLocation();
  // const { category } = useParams();
  // const selectCategory = activeCategory ?? category;
  const selectCategory = activeCategory;

  const handleSortChange = (value: string) => {
    const isMainPage = location.pathname === "/";
    if (isMainPage) {
      navigate(`/projects?sort=${value}`);
    } else {
      onSortChange?.(value);
    }
  };

  return (
    <div className="max-w-full   py-2">
      {/* delete: px-16 */}
      <div className=" lg:flex lg:items-center flex justify-between cursor-pointer  rounded-3xl flex-col md:flex-row gap-3 sm:gap-4 lg:p-5  ">
        <div className="flex items-center w-full gap-2 min-w-0">
          <button
            className="custom-prev swiper-button-disabled hidden sm:block"
            // onClick={() => swiperRef.current?.slidePrev()}
          >
            ❮
          </button>

          <div className=" min-w-0 overflow-hidden">
            <Swiper
              className="w-full "
              slidesPerView="auto"
              // spaceBetween={1}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              modules={[Keyboard, Navigation]}
              breakpoints={{
                768: {},
              }}
            >
              {CATEGRIES.map((categoryName) => {
                const isActive =
                  selectCategory?.toLowerCase() ===
                  categoryName.value.toLowerCase();
                return (
                  <SwiperSlide className="!w-auto" key={categoryName.value}>
                    <button
                      onClick={() => {
                        const newValue = isActive ? null : categoryName.value;

                        if (activeCategory !== undefined) {
                          onCategorySelect?.(newValue);
                        } else {
                          const targetPath = isActive
                            ? "/projects"
                            : `/projects?category=${categoryName.value}`;
                          navigate(targetPath);
                        }
                      }}
                      className={`h-8 px-6  text-gray-900 text-sm font-semibold rounded-full transition-all 
              ${
                isActive
                  ? "bg-neutral-200  "
                  : "bg-transparent hover:text-gray-700"
              }`}
                      // bg-transparent
                    >
                      {categoryName.label}
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <button
            className="custom-next swiper-button-disabled hidden sm:block"
            // onClick={() => swiperRef.current?.slideNext()}
          >
            ❯
          </button>
        </div>
        <div className="flex shrink-0 ml-4">
          <SortDropdown sortValue={sort} onChange={handleSortChange} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
