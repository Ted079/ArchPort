import { ProjectCategory } from "../../../../shared/types/project.types";
import { useForm } from "react-hook-form";
import {
  createProjectFormSchema,
  type CreateProjectFormInput,
  type CreateProjectFormOutput,
} from "../../../../shared/validators/createProject.validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import {
  updateProject,
  uploadImageFiles,
} from "../../store/project/projectSlice";
import { useGetOneProjectQuery } from "../../store/api/projectSlice";
import ProjectForm from "../../components/Forms/ProjectForm";

const Edit = () => {
  const { id } = useParams<{ id: string }>(); // !
  const {
    data: project,
    isLoading: isFetching,
    error,
  } = useGetOneProjectQuery(id!);
  const [currentImg, setCurrentImg] = useState<string[]>(project?.images || []); // !
  const [newFiles, setNewFiles] = useState<File[]>([]); // !

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<CreateProjectFormInput>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      category: project?.category || ProjectCategory.ARCHITECTURE,
      images: undefined,
      location: project?.location || "",

    },
  });

  useEffect(() => {
    if (project) {
      form.setValue("title", project.title);
      form.setValue("description", project.description);
      form.setValue("category", project.category as string);
      setCurrentImg(project.images);
      form.setValue("location", project.location);

    }
  }, [project, form.setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = newFiles;
    const newFile = Array.from(e.target.files || []);
    const combinedImages = [...currentFile, ...newFile].slice(0, 5);
    setNewFiles(combinedImages);
    e.target.value = "";
  };

  const removeCurrentImage = (imageUrl: string) => {
    setCurrentImg((prev) => prev.filter((img) => img !== imageUrl));
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: CreateProjectFormInput) => {
    if (!id) return;
    try {
      const formOutput = values as CreateProjectFormOutput;

      if (newFiles.length > 0) {
        const formData = new FormData();

        newFiles.forEach((image) => {
          formData.append("images", image);
        });
        await dispatch(
          uploadImageFiles({
            projectId: id,
            formData,
            currentImages: currentImg,
          }),
        ).unwrap();
      }

      const originalImages = project?.images || [];
      const imagesActuallyChanged =
        JSON.stringify(currentImg) !== JSON.stringify(originalImages);

      const updateData: any = {
        _id: id,
        title: formOutput.title,
        description: formOutput.description,
        category: formOutput.category as ProjectCategory,
        location: formOutput.location,
      };

      if (imagesActuallyChanged && newFiles.length === 0) {
        updateData.images = currentImg;
      }

      await dispatch(updateProject(updateData)).unwrap();

      navigate(`/details/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <>
      <ProjectForm
        form={form}
        currentImages={currentImg}
        onSubmit={onSubmit}
        onFileChange={handleFileChange}
        newFiles={newFiles}
        onCancel={() => navigate(`/details/${id}`)}
        title="Edit"
        onRemoveCurrentImage={removeCurrentImage}
        onRemoveNewFile={removeNewFile}
      />
    </>
  );
};

export default Edit;
