import type { IProject } from "../../../../shared/types/project.types";
import { ViewIcon } from "../UI/icons/ViewIcon";

interface ProjectCardProps extends IProject {
  mode: "home" | "dashboard";
}

const ProjectsCard = ({ images, author, title, views, mode }: ProjectCardProps) => {
  const isHome = mode === "home";
  return (
    <div>
      <div
        className="overflow-hidden bg-cover rounded-lg cursor-pointer h-55 group"
        style={{
          backgroundImage: `url(${images[0]})`,
        }}
      >
        <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-300 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
          <h2 className="mt-22 text-base font-semibold text-white capitalize">
            {title}
          </h2>

          {/* <Button children="" size="sm" icon={<EditIcon />} /> */}
          {/* дописать кнокпи сохранить и лайки  */}
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <div className="flex gap-x-1 items-center ">
          {isHome && (
            <img
              className="mt-1 h-20 w-20 sm:w-[1.7rem] sm:h-[1.7rem] flex-shrink-0 object-cover rounded-full"
              alt="user"
              src={author.avatar}
            />
          )}
          {isHome && (
            <h2 className="mt-1 ml-1 text-sm font-semibold text-gray-800 capitalize dark:text-white">
              {author.name}
            </h2>
          )}
        </div>
        <div className="flex items-center">
          <ViewIcon className="text-gray-500 w-5 h-5 mt-0.5" />
          <span className="ml-1 text-sm font-semibold text-gray-500 capitalize dark:text-white">
            {views}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;
