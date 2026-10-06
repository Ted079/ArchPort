import { useParams } from "react-router-dom";
import {
  useGetOneProjectQuery,
  useGetProjectsWithFiltersQuery,
} from "../../store/api/projectSlice";
import { Link } from "react-router-dom";
import ProjectList from "../../components/Project/ProjectList";
import { ROUTES } from "../../utils/route";
import ProjectView from "../../components/Project/ProjectView";
import ProjectSkeleton from "../../components/UI/ProjectSkeleton";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useGetOneProjectQuery(id!);
  const authorId = project?.author._id;
  const category = project?.category ?? "";
  // const tags = project?.tags;

  const { data: authorItems } = useGetProjectsWithFiltersQuery(
    { authorId, limit: 6 },
    {
      skip: !authorId,
    },
  );
  const authorProjects = authorItems?.projects ?? [];

  const { data } = useGetProjectsWithFiltersQuery(
    {
      sort: "-views",
      limit: 3,
      category,
    },
    {
      skip: !category,
    },
  );
  const moreProjects = data?.projects ?? [];

  if (isLoading) {
    return (
      <section>
        <div className="max-w-full lg:max-w-5xl px-3 sm:px-6 sm:py-10 mx-auto">
          <ProjectSkeleton value={1} size="lg" />
        </div>
      </section>
    );
  }
  if (error) return <div>Ошибка сервера</div>;

  return (
    <section className="">
      <div className="max-w-full lg:max-w-5xl px-3 sm:px-6 sm:py-10 mx-auto  ">
        <ProjectView project={project} id={id!} />

        {authorProjects.length > 2 && (
          <>
            <div className="flex justify-between">
              <p className="max-w-lg  font-bold mt-10 text-gray-800 ">
                More by {project?.author.name}
              </p>
              <Link
                to={ROUTES.PROFILE}
                className="max-w-lg  mt-8 text-sm  text-gray-600 "
              >
                View profile
              </Link>
            </div>
            <ProjectList
              items={authorProjects.filter((item) => item._id !== id)}
              showAuthor={false}
              showView={false}
              className="px-0 pb-0"
            />
          </>
        )}
        <div className="flex-1 h-px bg-gray-300  my-15"></div>

        <div className="flex justify-between">
          <p className="max-w-lg font-bold mt-2 text-gray-800 ">
            You migth like also
          </p>
          <Link
            to={`/projects?category=${encodeURIComponent(category ?? "")}`}
            className="max-w-lg   text-sm  text-gray-600 "
          >
            View all projects
          </Link>
        </div>
        {
          <ProjectList
            items={moreProjects}
            height="sm"
            column={3}
            showAuthor={false}
            showTitle={true}
            showView={false}
            className="px-0 pb-0"
          />
        }
      </div>
    </section>
  );
};

export default Details;
