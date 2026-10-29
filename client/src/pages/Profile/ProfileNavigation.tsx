// import SortDropdown from "../UI/SortDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";

const ProfileNavigation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

  const Pages = [
    { id: 1, link: "/works", label: "work" },
    { id: 2, link: "/about", label: "about" },
  ];

  return (
    <div className="max-w-full   py-2">
      <div className=" lg:flex lg:items-center flex justify-between cursor-pointer  rounded-3xl flex-col md:flex-row gap-3 sm:gap-4 lg:p-5  ">
        <div className="flex items-center w-full gap-2 min-w-0">
          <button className="custom-prev swiper-button-disabled hidden sm:block">
            ❮
          </button>

          <div className=" min-w-0 overflow-hidden">
            <Swiper
              className="w-full "
              slidesPerView="auto"
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              modules={[Keyboard, Navigation]}
              breakpoints={{
                768: {},
              }}
            >
              {Pages.map((page) => (
                <SwiperSlide className="!w-auto" key={page.id}>
                  <button
                    onClick={() => {}}
                    className={`h-8 px-6  text-gray-900 text-sm font-semibold rounded-full transition-all 
              
                `}
                  >
                    {page.label}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button className="custom-next swiper-button-disabled hidden sm:block">
            ❯
          </button>
        </div>
        <div className="flex shrink-0 ml-4">
          {/* <SortDropdown sortValue={sort} onChange={handleSortChange} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileNavigation;
