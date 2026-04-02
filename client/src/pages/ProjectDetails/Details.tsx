import { useNavigate, useParams } from "react-router-dom";
import { useGetOneProjectQuery } from "../../store/api/projectSlice";
import Button from "../../components/UI/Button";
import Images from "./Images";
import { Link } from "react-router-dom";
import { EditIcon } from "../../components/UI/icons";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect, useRef, useState } from "react";
import { deleteProj, getProjects } from "../../store/project/projectSlice";
import ProjectList from "../../components/Project/ProjectList";
import { BinIcon } from "../../components/UI/icons/BinIcon";
import Modal from "../../components/UI/Modal";
import WarningIcon from "../../components/UI/icons/Warning";
import { UseClickOutside } from "../../hooks/UseClickOutside";
// import Example from "./expl";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: project, isLoading, error } = useGetOneProjectQuery(id!);
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.project);

  useEffect(() => {
    const authorId = project?.author._id;
    if (authorId) {
      dispatch(getProjects(authorId));
    }
  }, [dispatch, project?.author._id]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка сервера</div>;

  const handleDelete = () => {
    if (!id) return;
    try {
      dispatch(deleteProj(id)).unwrap();
      navigate("/");
    } catch (err) {
      alert("Delete failed: " + err);
    }
  };

  // UseClickOutside(ref, () => setOpen(false));

  return (
    <section className="bg-white">
      <div className="max-w-full lg:max-w-6xl px-3 sm:px-6 sm:py-10 mx-auto  ">
        <div className="flex gap-5 justify-between">
          <h1 className="">
            <span className="text-xl font-semibold md:text-2xl">
              {project?.title}
            </span>{" "}
            by{" "}
            <Link className="underline" to={``}>
              {project?.author.name}
            </Link>{" "}
          </h1>

          {user?._id === project?.author._id && (
            <div className="flex gap-2">
              <Button
                size="sm"
                className=""
                variant="forIcons"
                onClick={() => navigate(`/uploads/${id}/edit`)}
                icon={<EditIcon />}
              />

              {
                <Button
                  size="sm"
                  className=""
                  variant="forIcons"
                  onClick={() => setIsOpen(true)}
                  icon={<BinIcon />}
                />
              }
            </div>
          )}
        </div>

        <Modal
          isOpen={isOpen}
          title="Are you sure?"
          icon={<WarningIcon size="md" />}
          descrtiption="Deleting this project is permanent. All associated data will be lost and cannot be recovered"
          onCancel={() => setIsOpen(false)}
          onConfirm={handleDelete}
          confirmText="Remove"
          cancelText="Cancel"
          ref={ref}
        />

        <div className="py-4 mx-auto">
          <div className="">
            <div className="">
              <Images images={project?.images} />

              <div className="">
                <h1 className="max-w-lg mt-12 mb-6 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
                  More about this product
                </h1>
              </div>
            </div>

            <div className="mt-2">
              <div className="mb-6">
                <h3 className="text-amber-500 capitalize">Description</h3>
                <p className="block mt-2 font-medium text-gray-700  ">
                  {project?.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-amber-500 capitalize">Date of creation</h3>

                <p className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500">
                  {project?.createdAt &&
                    new Date(project.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-amber-500 capitalize">Project type</h3>

                <a
                  href="#"
                  className="block mt-2 capitalize font-medium text-gray-700 hover:underline hover:text-gray-500  "
                >
                  {project?.category}
                </a>
              </div>

              {project?.location && (
                <div className="mb-6">
                  <h3 className="text-amber-500 capitalize">Location</h3>

                  <p className="block mt-2 font-medium  capitalize">
                    {project.location}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center mt-8 w-full">
              <div className="flex items-center w-full mb-4">
                <div className="flex-1 h-px bg-gray-200"></div>

                <div className="mx-4">
                  <img
                    className="object-cover rounded-full w-18 h-18 border-2 border-white shadow-sm"
                    src={project?.author.avatar}
                    alt="avatar"
                  />
                </div>

                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-800">
                  {project?.author.name}
                </h1>
                <p className="mt-1 text-sm text-gray-500 max-w-xs">
                  {project?.author.bio}
                </p>
                <div className="text-sm text-gray-600 mt-1">
                  {project?.author.email}
                </div>
              </div>

              <Button
                onClick={() => {}}
                size="md"
                variant="primary"
                className="mt-4 px-6 py-2"
              >
                Get in touch
              </Button>
            </div>

            <p className="max-w-lg mt-8 font-semibold  text-gray-800 ">
              More by {project?.author.name}
            </p>
            <ProjectList
              items={items.filter((item) => item._id !== id)}
              mode="dashboard"
              quantity={4}
            />
          </div>
        </div>
      </div>
      {/* <Example /> */}
    </section>
  );
};

export default Details;
