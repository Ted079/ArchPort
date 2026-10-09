import type { IProject } from "../../../../shared/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SearchBar from "../SeacrhForm/SearchForm";
import { Link } from "react-router-dom";
import ProjectSkeleton from "../UI/ProjectSkeleton";

interface HeroProps {
  items: IProject[];
  isLoading: boolean;
}
const Hero = ({ items, isLoading = false }: HeroProps) => {
  const sliceItems = items.slice(0, 4);

  return (
    <>
      <div className="max-w-full flex flex-col py-6 sm:py-10 mx-auto space-y-1 lg:h-[26rem] lg:py-16 lg:flex-row lg:items-center ">
        {/* delete: px-16 space-y-6 */}
        {/* idk: lg:py-16*/}
        <div className="w-full lg:w-1/2 mr-22">
          <div className="lg:max-w-xl">
            <h1 className="lg:text-center xs:text-right lg:text-left text-3xl   font-bold tracking-wide dark:text-white md:text-5xl leading-tight lg:max-none  ">
              Discover Top
              <br />
              <span className="lg:whitespace-nowrap">
                Architects & Designers
              </span>
            </h1>

            <p className="lg:text-center lg:text-left mt-4 sm:px-16 lg:px-0 text-gray-600 ">
              Browse exceptional portfolios from talented professionals
              specializing in architecture, interiors, and visual design — and
              find the right expert for your next idea.
            </p>

            <div className="mt-6 lg:mt-10">
              <SearchBar />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center w-full h-102 lg:w-1/2">
          {isLoading ? (
            <ProjectSkeleton value={1} size="lg" showLine={false} />
          ) : (
            <Swiper
              className="object-cover w-full h-full max-w-xl rounded-3xl"
              spaceBetween={15}
              slidesPerView={1}
              centeredSlides={true}
              breakpoints={{
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 45,
                },
                1200: {
                  slidesPerView: 1,
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={700}
              modules={[Autoplay]}
            >
              {sliceItems.map((item) => (
                <SwiperSlide>
                  <Link to={`/details/${item._id}`}>
                    <img
                      className="object-cover w-full h-full max-w-xl rounded-3xl"
                      src={item.images[0]}
                      alt="glasses photo2"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
