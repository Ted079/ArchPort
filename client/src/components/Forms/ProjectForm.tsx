import React, { useEffect} from "react";
import type { UseFormReturn } from "react-hook-form";
import type { CreateProjectFormInput } from "../../../../shared/validators/createProject.validators";
import { ProjectCategory } from "../../../../shared/types";
import Button from "../UI/Button";
import ImagePreview from "../Image/ImagePreview";
import { ImagesIcon } from "../UI/icons/ImagesIcon";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "../UI/icons/BackIcon";

type Props = {
  form: UseFormReturn<CreateProjectFormInput>;
  onSubmit: (data: CreateProjectFormInput) => Promise<void>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;

  currentImages?: string[];
  newFiles?: File[];

  onRemoveCurrentImage?: (imageUrl: string) => void;
  onRemoveNewFile?: (index: number) => void;

  title?: string;
  submitBtnText?: string;
  isSubmitting?: boolean;

  tagInput: string;
  onTagInputChange: (val: string) => void;
  onAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (tag: string) => void;
};

const ProjectForm = ({
  onSubmit,
  onFileChange,
  onCancel,
  form,
  currentImages = [],
  newFiles = [],
  onRemoveCurrentImage,
  onRemoveNewFile,
  title = "Project Details",
  submitBtnText = "Save Changes",
  isSubmitting = false,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors},
    watch,
    setValue,
  } = form;

  useEffect(() => {
    register("images");
  }, [register]);

  const watchedTags = watch("tags") || [];

  const navigate = useNavigate();
  const watchedImages = watch("images");
  const displayFiles =
    newFiles && newFiles.length > 0
      ? newFiles
      : watchedImages
        ? Array.from(watchedImages)
        : [];

  return (
    <section className=" dark:bg-gray-900 mb-20 mt-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl ">
        <form
          className="w-full flex flex-col gap-6 lg:flex-row lg:gap-15"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full lg:w-1/4">
            <BackIcon
              onClick={() => navigate(-1)}
              className="w-6 h-6 mb-4 cursor-pointer"
            />
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
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

            {currentImages.length > 0 && onRemoveCurrentImage && (
              <div className="mt-8">
                <label className="block mb-3 font-medium">
                  Current Images ({currentImages.length})
                </label>
                {currentImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                    {currentImages.map((imageUrl) => (
                      <div
                        key={imageUrl}
                        className="relative group cursor-pointer rounded-lg overflow-hidden"
                      >
                        <img
                          src={imageUrl}
                          alt="Current"
                          className="w-full h-32 object-cover group-hover:opacity-50 transition"
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveCurrentImage(imageUrl)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/50"
                        >
                          <span className="text-white font-semibold">
                            Remove
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No images</p>
                )}
              </div>
            )}

            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center  px-4 sm:px-6 py-4 sm:py-6 h-40 sm:h-60 mx-auto mt-4 sm:mt-6 text-center bg-white rounded-lg cursor-pointer border-2 border-dashed transition-all ${
                errors.images ? "border-red-500" : "border-gray-300"
              }`}
            >
              {displayFiles.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 w-full max-h-80 overflow-y-auto p-4">
                  {displayFiles.map((image, index) => (
                    <ImagePreview
                      key={`${image.name}-${image.lastModified}`}
                      file={image}
                      onRemove={() => {
                        if (onRemoveNewFile) {
                          onRemoveNewFile(index);
                        }
                        const updatedFile = displayFiles.filter(
                          (_, i) => i !== index,
                        );
                        setValue("images", updatedFile);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <ImagesIcon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-[#333333] mt-2 sm:mt-3" />

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
                onChange={onFileChange}
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
                    peer-checked:bg-[#252525] peer-checked:border-transparent peer-checked:text-white 
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

            <div className="mt-8">
              <label className="block mb-3 font-medium  dark:text-gray-200">
                Location
              </label>
              <input
                {...register("location")}
                type="text"
                className="w-full py-2  px-4  rounded-lg  focus:outline-none border transition-all 
                     border-gray-300 focus:border-stone-500 "
                placeholder="Add location"
              />
            </div>
            <div className="mt-8">
              <label className="block mb-3 font-medium  dark:text-gray-200">
                Firm
              </label>
              <input
                {...register("firm")}
                type="text"
                className="w-full py-2  px-4  rounded-lg  focus:outline-none border transition-all 
                     border-gray-300 focus:border-stone-500 "
                placeholder="Add firm"
              />
            </div>

            <div className="mt-8">
              <label className="block mb-3 font-medium  dark:text-gray-200">
                Building Area
              </label>
              <input
                {...register("square", { valueAsNumber: true })}
                type="number"
                className="w-full py-2  px-4  rounded-lg  focus:outline-none border transition-all 
                     border-gray-300 focus:border-stone-500 "
                placeholder="Add square"
              />
            </div>

            <div className="mt-8">
              <label className="block mb-3 font-medium dark:text-gray-200">
                Tags
              </label>

              {watchedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {watchedTags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-[#252525] text-white text-sm rounded-full"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => onRemoveTag(tag)}
                        className="ml-1 hover:text-gray-300 transition"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <input
                value={tagInput}
                onKeyDown={onAddTag}
                onChange={(e) => onTagInputChange(e.target.value)}
                type="text"
                disabled={watchedTags.length >= 10}
                className="w-full py-2 px-4 rounded-lg focus:outline-none border transition-all
               border-gray-300 focus:border-stone-500 disabled:opacity-50"
                placeholder={
                  watchedTags.length >= 10
                    ? "Maximum 10 tags"
                    : "Add tag and press Enter"
                }
              />
              <p className="text-xs text-gray-400 mt-1">
                Press Enter or comma to add • {watchedTags.length}/10
              </p>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-15 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
              <Button
                className="w-full sm:w-auto"
                size="md"
                type="button"
                variant="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>

              <div className="text-red-500 mb-4">
                {Object.keys(form.formState.errors).map((key) => (
                  <p key={key}>
                    {key}:{" "}
                    {
                      form.formState.errors[key as keyof CreateProjectFormInput]
                        ?.message
                    }
                  </p>
                ))}
              </div>
              <Button
                className="w-full sm:w-auto"
                size="md"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : submitBtnText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProjectForm;
