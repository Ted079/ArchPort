import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import ImagesCard from "../Image/ImagesCard";
import { Link } from "react-router-dom";
import { EditIcon } from "../UI/icons";
import { useAppDispatch, useAppSelector } from "../../store";
import { useState } from "react";

import { deleteProj } from "../../store/project/projectSlice";
import { BinIcon } from "../UI/icons/BinIcon";
import Modal from "../UI/Modal";
import WarningIcon from "../UI/icons/Warning";
import type { IProject } from "../../../../shared/types";

const ProjectView = ({
  id,
  project,
}: {
  id: string;
  project: IProject | undefined;
}) => {
  if (!project) return null;

  const {
    title,
    images,
    tags,
    firm,
    location,
    description,
    createdAt,
    square,
    author,
    category,
  } = project;
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(tags);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProj(id)).unwrap();
      navigate("/");
    } catch (err) {
      alert("Delete failed: " + err);
    }
  };
  return (
    <>
      <div className="flex gap-5 justify-between">
        <h1 className="">
          <span className="text-xl font-semibold md:text-2xl">{title}</span> by{" "}
          <Link className="underline" to={``}>
            {author.name}
          </Link>{" "}
        </h1>

        {user?._id === author._id && (
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

      <div className="py-4 mx-auto">
        <div className="">
          <ImagesCard images={images} id={id} />
          <div className="mt-2 flex flex-col  p-12 mt-6 lg:gap-6 lg:mt-0">
            <p className="text-gray-500 text-sm">
              Published on{" "}
              {new Date(createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <h1 className="max-w-lg mt-12 mb-6 text-3xl font-semibold leading-tight text-gray-800">
              More about this product
            </h1>
            <div className="mb-6">
              <p className="block mt-2  text-gray-700  text-xl/8 ">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  pt-8">
              <div className="flex gap-2">
                <span className="text-gray-500">Type:</span>
                <span className="font-semibold capitalize">
                  {project.category}
                </span>
              </div>
              {project.location && (
                <div className="flex gap-2">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-semibold">{project.location}</span>
                </div>
              )}
              {project.square && (
                <div className="flex gap-2">
                  <span className="text-gray-500">Area:</span>
                  <span className="font-semibold">{project.square} m²</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 mb-3 pt-12">
              {" "}
              <span className="block font-medium dark:text-gray-200">
                Tags:
              </span>
              <div className="flex flex-wrap gap-2">
                {tags &&
                  tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        children={tag}
                        className="font-semibold sm:px-5 sm:py-3 flex wrap px-3 text-sm sm:px-4 sm:py-2"
                      />
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-8 w-full">
            <div className="flex items-center w-full mb-4">
              <div className="flex-1 h-px bg-gray-300"></div>

              <div className="mx-4">
                <img
                  className="object-cover rounded-full w-18 h-18 border-2 border-white shadow-sm"
                  src={author.avatar}
                  alt="avatar"
                />
              </div>

              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">{author.name}</h1>
              <p className="mt-1 text-sm text-gray-500 max-w-xs">
                {author.bio}
              </p>
              <div className="text-sm text-gray-600 mt-1">{author.email}</div>
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
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        title="Are you sure?"
        icon={<WarningIcon size="md" />}
        description="Deleting this project is permanent. All associated data will be lost and cannot be recovered"
        onCancel={() => setIsOpen(false)}
        onConfirm={handleDelete}
        confirmText="Remove"
        cancelText="Cancel"
      />
    </>
  );
};

export default ProjectView;
