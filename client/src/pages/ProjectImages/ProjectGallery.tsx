import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetOneProjectQuery } from "../../store/api/projectSlice";
import { CloseIcon } from "../../components/UI/icons/CloseIcon";
import SwiperImages from "../../components/Image/SwiperImages";

function ProjectGallery() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const initialIndex = Number(searchParams.get("index") || 0);

  const { data: project, isLoading } = useGetOneProjectQuery(id!);
  const images = project?.images;

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (!images || images.length === 0)
    return <div className="text-white">No images found</div>;

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col">
      <div className="relative flex-1 w-full max-w-[1440px] mx-auto flex gap-4 p-4 md:p-10 overflow-hidden group">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-50 flex items-center justify-center w-10 h-10 bg-[#333333] rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#444444]"
        >
          <CloseIcon className="w-5 h-5 text-white" />
        </button>

        <div className="absolute bottom-12 left-10 z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {project?.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base mt-1 italic">
            {project?.location}
          </p>
        </div>

        <SwiperImages images={images} initialSlide={initialIndex} />
      </div>
    </div>
  );
}
export default ProjectGallery;
