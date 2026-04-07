import type { IProject } from "../../../../shared/types/project.types";
import ProjectsCard from "./ProjectsCard";
import type {
  CardHeight,
  GridColumns,
} from "../../../../shared/types/ui.types";
import { cn } from "../../utils/twMerge";
import Button from "../UI/Button";

const columnClasses: Record<GridColumns, string> = {
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
};

interface ProjectsProps {
  items: IProject[];
  limit?: number;
  column?: GridColumns;
  showAuthor?: boolean;
  showTitle?: boolean;
  height?: CardHeight;
  className?: string;
  showLoadMore?: boolean;
  showView?: boolean,
}

const ProjectList = ({
  items,
  limit,
  column = 4,
  showAuthor = true,
  showTitle = false,
  showLoadMore = false,
  showView = true,
  height = "sm",
  className = "px-16 pb-1",
}: ProjectsProps) => {
  const displayItems = limit ? items.filter((_, i) => i < limit) : items;
  return (
    <div className={cn("max-w-full mx-auto", className)}>
      <div
        className={`grid grid-cols-1 gap-8 mt-8 xl:mt-1 xl:gap-8 md:grid-cols-2 ${columnClasses[column]}`}
      >
        {displayItems.map((item) => (
          <ProjectsCard
            {...item}
            showAuthor={showAuthor}
            showTitle={showTitle}
            showView={showView}
            cardHeight={height}
            key={item._id}
          />
        ))}
      </div>
      {showLoadMore && <div className="my-14 flex justify-center">
        <Button
          size="sm"
          variant="secondary"
          type="button"
          className="font-bold hidden lg:flex sm:px-5 sm:py-3"
        >
          Load more work
        </Button>
      </div>}
    </div>
  );
};

export default ProjectList;
