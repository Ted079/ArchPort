import { useParams, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
//   updateProject,
//   updateProjectImages,
} from "../../store/project/projectSlice";
import { ProjectCategory } from "../../../../shared/types/project.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectFormSchema,
  type CreateProjectFormInput,
  type CreateProjectFormOutput,
} from "../../../../shared/validators/createProject.validators";
import { useEffect, useState } from "react";

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const { items: projects, isLoading, isUploading, error } = useAppSelector(
//     (state) => state.projects,
//   );

//   const project = projects.find((p) => p._id === id);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateProjectFormInput>({
    resolver: zodResolver(createProjectFormSchema),
    // defaultValues: {
    //   title: project?.title || "",
    //   description: project?.description || "",
    //   category: project?.category || ProjectCategory.ARCHITECTURE,
    //   images: undefined,
    // },
  });

//   useEffect(() => {
//     if (project) {
//       setValue("title", project.title);
//       setValue("description", project.description);
//       setValue("category", project.category);
//     }
//   }, [project, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  const onSubmit = async (values: CreateProjectFormInput) => {
    if (!id) return;

    try {
      const formOutput = values as CreateProjectFormOutput;

      // Шаг 1: Обновляем фото (если есть новые)
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => {
          formData.append("images", file);
        });

        // await dispatch(
        //   uploadImageFiles({
        //     projectId: id,
        //     formData,
        //   }),
        // ).unwrap();
      }

      // Шаг 2: Обновляем данные проекта
    //   await dispatch(
    //     updateProject({
    //       _id: id,
    //       title: formOutput.title,
    //       description: formOutput.description,
    //       category: formOutput.category as ProjectCategory,
    //     }),
    //   ).unwrap();

      navigate(`/projects/${id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

//   if (!project) return <div>Loading...</div>;

  const newFileArray = watch("images")
    ? Array.from(watch("images") || [])
    : [];

//   const isSubmitting = isLoading || isUploading;

  return (
    <section className="dark:bg-gray-900 mb-20 mt-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )} */}

        <form
          className="w-full flex flex-col gap-6 lg:flex-row"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full lg:w-1/4">
            <h2 className="text-lg font-semibold mb-2">Edit Project</h2>
          </div>

          <div className="w-full lg:w-1/2">
            {/* TITLE */}
            <div>
              <label className="block mb-3 font-medium">Project Name</label>
              <input
                {...register("title")}
                type="text"
                className={`w-full py-2 px-4 border rounded-lg ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* CURRENT IMAGES */}
            <div className="mt-8">
              <label className="block mb-3 font-medium">
                Current Images
              </label>
              <div className="grid grid-cols-4 gap-4">
                {/* {project.images.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt="Current"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))} */}
              </div>
            </div>

            {/* NEW IMAGES */}
            <div className="mt-8">
              <label className="block mb-3 font-medium">Add New Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-4 border-2 border-dashed rounded-lg"
              />
              {newFileArray.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {newFileArray.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt="New"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <label className="block mb-3 font-medium">Description</label>
              <textarea
                {...register("description")}
                className={`w-full py-2 px-4 border rounded-lg ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                rows={5}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div className="mt-8">
              <label className="block mb-3 font-medium">Category</label>
              <div className="flex gap-2 flex-wrap">
                {Object.values(ProjectCategory).map((cat) => (
                  <label key={cat} className="cursor-pointer">
                    <input
                      type="radio"
                      {...register("category")}
                      value={cat}
                      className="peer hidden"
                    />
                    <div className="peer-checked:bg-stone-500 peer-checked:text-white px-4 py-2 border rounded-full">
                      {cat}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => navigate(`/projects/${id}`)}
                // disabled={isSubmitting}
                className="px-6 py-2 border rounded-lg disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                // disabled={isSubmitting}
                className="px-6 py-2 bg-stone-500 text-white rounded-lg disabled:opacity-50"
              >
                {/* {isSubmitting ? "Saving..." : "Save"} */}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProject;