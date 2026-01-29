import { ProjectCategory } from "../../../../shared/types/project.types";
import { useForm } from "react-hook-form";
import {
  createProjectFormSchema,
  type CreateProjectFormInput,
  type CreateProjectFormOutput,
} from "../../../../shared/validators/createProject.validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import ImagePreview from "./ImagePreview";
import { ImagesIcon } from "../UI/icons/ImagesIcon";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import {
  createProject,
  uploadImageFiles,
} from "../../store/project/projectSlice";

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setValue,
  } = useForm<CreateProjectFormInput>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: ProjectCategory.ARCHITECTURE,
      images: undefined,
    },
  });

  useEffect(() => {
    register("images");
  }, [register]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = watch("images") || [];
    const newFile = Array.from(e.target.files || []);
    const combinedImages = [...currentFile, ...newFile].slice(0, 5);
    setValue("images", combinedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });
    e.target.value = "";
  };

  const onSubmit = async (values: CreateProjectFormInput) => {
    try {
      const formOutput = values as CreateProjectFormOutput;

      const projectData = await dispatch(
        createProject({
          title: values.title,
          description: values.description,
          category: values.category as ProjectCategory,
          images: [],
        }),
      ).unwrap();

      const projectId = projectData._id;

      if (formOutput.images && formOutput.images.length > 0) {
        const formData = new FormData();

        formOutput.images.forEach((image) => {
          formData.append("images", image);
        });
        await dispatch(
          uploadImageFiles({
            projectId,
            formData,
          }),
        ).unwrap();
      }
      navigate("/");
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const watchedImages = watch("images");
  const fileArray = watchedImages ? Array.from(watchedImages) : [];

  return (
    <section className=" dark:bg-gray-900 mb-20 mt-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl ">
        <form
          className="w-full flex flex-col gap-6 lg:flex-row lg:gap-15"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full lg:w-1/4">
            <h2 className="text-lg font-semibold mb-2">Project Details</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              This information is only visible to employees of your firm
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <div>
              <label className="block mb-3 font-medium  dark:text-gray-200">
                Project Name
              </label>
              <input
                {...register("title")}
                type="text"
                className={`w-full py-2  px-4  rounded-lg  focus:outline-none border transition-all ${
                  errors.title
                    ? "border-red-500 "
                    : "border-gray-300 focus:border-stone-500 "
                }`}
                placeholder="Add project name"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center  px-4 sm:px-6 py-4 sm:py-6 h-40 sm:h-60 mx-auto mt-4 sm:mt-6 text-center bg-white rounded-lg cursor-pointer border-2 border-dashed transition-all ${
                errors.images ? "border-red-500" : "border-gray-300"
              }`}
            >
              {fileArray.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 w-full max-h-80 overflow-y-auto p-4">
                  {fileArray.map((image, index) => (
                    <ImagePreview
                      key={`${image.name}-${image.lastModified}`}
                      file={image}
                      onRemove={() => {
                        const updatedFile = fileArray.filter(
                          (_, i) => i !== index,
                        );
                        setValue("images", updatedFile);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <ImagesIcon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-[#F96E5B] mt-2 sm:mt-3" />

                  <div>
                    <h2 className="mx-2 sm:mx-3 text-sm sm:text-base font-semibold text-gray-700 mt-2 sm:mt-3">
                      Drag and drop an image, or Browse
                    </h2>
                    <p className="mx-2 sm:mx-3 text-xs sm:text-sm text-gray-400 mt-1">
                      Minimum 1600px width recommended. Max 10MB each
                    </p>
                    <p className="mx-2 sm:mx-3 text-xs sm:text-sm text-gray-400">
                      High resolution images (jpeg, jpg, png, webp)
                    </p>
                  </div>
                </>
              )}

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </p>
            )}
            <div className="mt-8 ">
              <label className="block mb-2 mb-3 font-medium  dark:text-gray-200">
                Description
              </label>
              <textarea
                {...register("description")}
                className={`block w-full py-2  rounded-lg px-4 focus:outline-none focus:ring focus:ring-opacity-40 border transition-all ${
                  errors.description
                    ? "border-red-500 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:border-stone-400 focus:ring-stone-300"
                }`}
                placeholder="Add project description "
                rows={5}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="mt-8  ">
              <span className="block mb-3 sm:mb-4 font-medium  dark:text-gray-200">
                Project type
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.values(ProjectCategory).map((cat) => (
                  <label className="cursor-pointer" key={cat}>
                    <input
                      type="radio"
                      {...register("category")}
                      value={cat as string}
                      className="peer hidden"
                    />
                    <div
                      className="px-3 sm:px-6 py-1 py-2 rounded-full border text-xs sm:text-sm transition-all 
                    peer-checked:bg-[#333333] peer-checked:text-white
                    border-gray-300 hover:border-stone-400"
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-15 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
              <Button
                className="w-full sm:w-auto"
                size="md"
                type="button"
                variant="secondary"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </Button>

              <Button
                className="w-full sm:w-auto"
                size="md"
                variant="primary"
                type="submit"
                disabled={isSubmitted}
              >
                {isSubmitted ? "Loading..." : "Save changes"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Upload;
