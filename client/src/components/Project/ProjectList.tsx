import type { IProject } from "../../../../shared/types/project.types";
import ProjectsCard from "./ProjectsCard";

interface ProjectsPropsForHome {
  mode: "home";
  items: IProject[];
  quantity?: number;
}

interface ProjectsPropsForDashboard {
  mode: "dashboard";
  items: IProject[];
  quantity?: number;
}


type ProjectsProps = ProjectsPropsForDashboard | ProjectsPropsForHome;

const ProjectList = ({ items, mode, quantity }: ProjectsProps) => {
 
  const displayItems = quantity ? items.filter((_, i) => i < quantity ) : items;
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-full px-16 pb-39 mx-auto">
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-4">
          {displayItems.map((item) => (
            <ProjectsCard {...item} mode={mode} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
