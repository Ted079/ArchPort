import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";

const ImagesCard = ({ images }: { images: string[] | undefined }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(images);

  if (!images || images.length === 0) {
    return <div>No image</div>;
  }
  return (
    <div className="flex w-full ">
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
        className="w-[75%] h-full rounded-lg" // 2. Ограничиваем ширину основного блока

      >
        {images.map((image) => (
          <SwiperSlide>
            <div className="w-full h-[550px] flex items-center justify-center overflow-hidden ">
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
          height: "100%" ,
          // background:"#333333",
        }}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        
        freeMode={true}
        navigation={true}
        direction="vertical"
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        // className="w-full h-full lg:w-[20%] h-full "
        className="w-[10%] h-full" // 3. Четкая ширина и высота
      >
        {images.map((image) => (
          <SwiperSlide key={image} className="!h-auto">
            <div className="w-full h-[100px]  overflow-hidden rounded-md cursor-pointer hover:opacity-75 border-2 border-transparent swiper-slide-thumb-active:border-blue-500">
              <img
                src={image}
                alt="images"
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImagesCard;
