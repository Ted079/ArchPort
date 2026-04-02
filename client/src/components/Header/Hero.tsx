import type { IProject } from "../../../../shared/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface HeroProps {
  items: IProject[];
}
const Hero = ({ items }: HeroProps) => {
  console.log(items);

  return (
    <>
      <div className="max-w-full  flex flex-col px-16 sm:py-10 mx-auto space-y-6 lg:h-[26rem] lg:py-16 lg:flex-row lg:items-center ">
        <div className="w-full lg:w-1/2 mr-22">
          <div className="lg:max-w-xl">
            <h1 className="text-center lg:text-left text-3xl   font-semibold tracking-wide dark:text-white md:text-5xl leading-tight lg:max-none  ">
              Discover Top Architects & Designers
            </h1>

            <p className="text-center lg:text-left mt-4 sm:px-16 lg:px-0 text-gray-600 dark:text-gray-300">
              Browse exceptional portfolios from talented professionals
              specializing in architecture, interiors, and visual design — and
              find the right expert for your next idea.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center w-full h-102 lg:w-1/2">
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
            {/* <SwiperSlide className="object-cover w-full h-full max-w-xl rounded-3xl">
              <img
                className="object-cover w-full h-full max-w-xl rounded-3xl"
                src="https://w.wallhaven.cc/full/ne/wallhaven-ne5dxw.jpg"
                alt="glasses photo"
              />
            </SwiperSlide> */}
            <SwiperSlide>
              <img
                className="object-cover w-full h-full max-w-xl rounded-3xl"
                src="https://w.wallhaven.cc/full/mp/wallhaven-mpyxky.jpg"
                alt="glasses photo2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-cover w-full h-full max-w-xl rounded-3xl"
                src="https://w.wallhaven.cc/full/q2/wallhaven-q2vp9l.jpg"
                alt="glasses photo3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Hero;
