import { Link } from "react-router-dom";
import type { CardHeight } from "../../../../shared/types/ui.types";
import { ViewIcon } from "../UI/icons/ViewIcon";
import { LikeIcon } from "../UI/icons/LikeIcon";

interface ProjectsCardProsps {
  _id: string;
  images: string[];
  title: string;
  views: number;
  author: { name: string; avatar?: string };
  showAuthor?: boolean;
  showTitle?: boolean;
  showView?: boolean;
  cardHeight?: CardHeight;
}

const heightClasses: Record<CardHeight, string> = {
  sm: "h-64 xl:h-56",
  md: "h-64 xl:h-72",
  lg: "h-64 xl:h-96",
};

const ProjectsCard = ({
  images,
  author,
  title,
  views,
  _id,
  showAuthor,
  showTitle,
  showView,
  cardHeight = "sm",
}: ProjectsCardProsps) => {
  return (
    <Link to={`/details/${_id}`}>
      <div
        className={`overflow-hidden bg-cover rounded-lg cursor-pointer ${heightClasses[cardHeight]} group`}
        style={{
          backgroundImage: `url(${images[0]})`,
        }}
      >
        <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-300 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
          <h2 className="mt-22 text-base font-semibold text-white capitalize">
            {title}
          </h2>

        </div>
      </div>
      <div className="flex justify-between mt-1  p-1 rounded-xl">
        <div className="flex gap-x-1 items-center ">
          {showAuthor && (
            <img
              className="mt-1 h-20 w-20 sm:w-[1.7rem] sm:h-[1.7rem] flex-shrink-0 object-cover rounded-full"
              alt="user"
              src={author.avatar ?? "/default-avatar.png"}
            />
          )}
          {showAuthor && (
            <p className="mt-1 ml-1 text-sm font-semibold text-gray-800 capitalize ">
              {author.name}
            </p>
          )}
          {showTitle && (
            <p className="mt-1 ml-1 text-sm font-semibold text-gray-800 capitalize ">
              {title}
            </p>
          )}
        </div>

        {showView && <div className="flex items-center">
          <LikeIcon className="text-gray-400 w-5 h-5 mt-0.5" />
          <span className="ml-1 text-sm font-semibold text-gray-500 capitalize mr-1 ">
            {Math.floor(Math.random() * 101)}
          </span>
           <ViewIcon className="text-gray-400 w-5 h-5 mt-0.5" />
          <span className="ml-1 text-sm font-semibold text-gray-500 capitalize ">
            {views}
          </span>
        </div>}
      </div>
    </Link>
  );
};

export default ProjectsCard;
