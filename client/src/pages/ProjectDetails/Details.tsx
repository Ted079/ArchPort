import { useParams } from "react-router-dom";
import {
  useGetOneProjectQuery,
  useGetProjectByAuthorQuery,
} from "../../store/api/projectSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";

import { getProjects } from "../../store/project/projectSlice";
import ProjectList from "../../components/Project/ProjectList";
import { ROUTES } from "../../utils/route";
import ProjectView from "../../components/Project/ProjectView";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { data: project, isLoading, error } = useGetOneProjectQuery(id!);
  const { items } = useAppSelector((state) => state.project);

  const authorId = project?.author._id;
  const { data: authorItems = [] } = useGetProjectByAuthorQuery(authorId!, {
    skip: !authorId,
  });

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка сервера</div>;

  return (
    <section className="bg-gray-100">
      <div className="max-w-full lg:max-w-5xl px-3 sm:px-6 sm:py-10 mx-auto  ">
        <ProjectView project={project} id={id!} />

        {authorItems.length > 2 && (
          <>
            <div className="flex justify-between">
              <p className="max-w-lg mt-8 font-bold  text-gray-800 ">
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
              items={authorItems.filter((item) => item._id !== id)}
              limit={4}
              showAuthor={false}
              showView={false}
              className="px-0 pb-0"
            />
          </>
        )}
        <div className="flex-1 h-px bg-gray-300  my-15"></div>
        <p className="max-w-lg mt-8 font-bold  text-gray-800 ">
          You migth like also
        </p>
        <ProjectList
          items={items}
          limit={6}
          height="md"
          column={3}
          showAuthor={false}
          showTitle={true}
          showView={false}
          className="px-0 pb-0"
        />
      </div>
    </section>
  );
};

export default Details;
