import { Link } from "react-router-dom";

const ImagesCard = ({
  images,
  id,
}: {
  images: string[] | undefined;
  id: string | undefined;
}) => {
  if (!images || images.length === 0) {
    return <div>No image</div>;
  }
  

  return (
    <div className="flex w-full ">
        <Link to={`/projects/${id}/images?index=${0}`} className="w-full h-[550px] flex items-center justify-center overflow-hidden ">
          <img
            src={images[0]}
            alt="images"
            className="max-h-full max-w-full object-contain rounded-md"
          />
        </Link>

      <div className="w-[10%] h-full">
        {images.map((image, index) => (
          <Link to={`/projects/${id}/images?index=${index}`} key={index}>
            <div className="w-full h-[100px]  overflow-hidden rounded-md cursor-pointer hover:opacity-75 border-2 border-transparent swiper-slide-thumb-active:border-blue-500">
              <img
                src={image}
                alt="thumb"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImagesCard;
