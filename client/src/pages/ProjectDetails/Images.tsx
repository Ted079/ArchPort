import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";

const Images = ({ images }: { images: string[] | undefined }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images || images.length === 0) {
    return <div>No image</div>;
  }
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#333333",
          "--swiper-pagination-color": "#333333",
          cursor: "pointer",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mb-3"
      >
        {images.map((image) => (
          <SwiperSlide>
            <div className="w-full h-[650px] flex items-center justify-center overflow-hidden ">
              <img
                src={image}
                alt="images"
                className="max-h-full max-w-full object-contain rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        style={{
          "--swiper-navigation-color": "#333333",
          "--swiper-pagination-color": "#333333",
          cursor: "pointer",
        }}
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        slidesPerView={5}
        freeMode={true}
        navigation={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="w-full h-[150px] overflow-hidden rounded-md cursor-pointer hover:opacity-75">
              <img
                src={image}
                alt="images"
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Images;
