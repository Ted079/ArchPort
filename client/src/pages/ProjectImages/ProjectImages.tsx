import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneProjectQuery } from "../../store/api/projectSlice";
import ImagesCard from "../../components/Image/ImagesCard";
import { BackIcon } from "../../components/UI/icons/BackIcon";
import SwiperImages from "../../components/Image/SwiperImages";

function ProjectImages() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, error, isLoading } = useGetOneProjectQuery(id!);

  const imagesWithIds = project?.images.map((url: string, index: number) => ({
    id: index + 1,
    url: url,
  }));

  console.log(imagesWithIds);
  console.log(project?.images);

  return (
    <div className="w-full min-h-screen">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm w-full px-22 py-6">
        <div className="flex flex-col items-center justify-between lg:flex-row mx-auto max-w-[1440px]">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            <BackIcon
              onClick={() => navigate(-1)}
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <div className="flex mt-4 lg:mt-0 -mx-2">
            <a href="#" className="mx-2 text-gray-600 hover:text-blue-500">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 py-6 mx-auto max-w-[1440px]">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-8">
          <p className="text-sm text-gray-500">
            {project?.title} / {project?.location}
          </p>
        </div>

        <div className="w-full">
          <SwiperImages images={project?.images} />
        </div>
      </div>
    </div>
  );
}

export default ProjectImages;


