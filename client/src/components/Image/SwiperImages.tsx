import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";

const SwiperImages = ({
  images,
  initialSlide = 0,
}: {
  images: string[] | undefined;
  initialSlide?: number;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  if (!images || images.length === 0)
    return <div className="text-white">No images found</div>;
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        initialSlide={initialSlide}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[80%] h-full rounded-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`main-${index}`}>
            <div className="w-full h-full flex items-center justify-center rounded-md">
              <img
                src={image}
                alt="project"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        initialSlide={initialSlide}
        onSwiper={setThumbsSwiper}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[15%] h-full thumbs-slider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`thumb-${index}`} className="cursor-pointer">
            <div className="w-full h-full max-h-[120px] overflow-hidden rounded-md border-2 border-transparent swiper-slide-thumb-active:border-white transition-all">
              <img
                src={image}
                alt="thumb"
                className="w-full h-full object-cover opacity-60 swiper-slide-thumb-active:opacity-100"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperImages;
