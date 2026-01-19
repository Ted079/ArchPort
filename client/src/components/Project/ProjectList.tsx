import type { IProject } from "../../../../shared/types/project.types";
import ProjectsCard from "./ProjectsCard";

interface ProjectsPropsForHome {
  mode: "home";
  items: IProject[];
}

interface ProjectsPropsForDashboard {
  mode: "dashboard";
  items: IProject[];
}

type ProjectsProps = ProjectsPropsForDashboard | ProjectsPropsForHome;

const ProjectList = ({ items, mode }: ProjectsProps) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-12 pb-39 mx-auto">

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <ProjectsCard {...item} mode={mode} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
};



export default ProjectList;

