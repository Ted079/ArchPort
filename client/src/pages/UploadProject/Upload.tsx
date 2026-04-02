import { ProjectCategory } from "../../../../shared/types/project.types";
import { useForm } from "react-hook-form";
import {
  createProjectFormSchema,
  type CreateProjectFormInput,
  type CreateProjectFormOutput,
} from "../../../../shared/validators/createProject.validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  createProject,
  uploadImageFiles,
} from "../../store/project/projectSlice";
import ProjectForm from "../../components/Forms/ProjectForm";

const Upload = () => {
  const { isLoading, isUploading } = useAppSelector((state) => state.project);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<CreateProjectFormInput>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: ProjectCategory.ARCHITECTURE,
      images: undefined,
      location: "",
    },
  });

  useEffect(() => {
    form.register("images");
  }, [form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = form.watch("images") || [];
    const newFile = Array.from(e.target.files || []);
    const combinedFiles = [...currentFile, ...newFile].slice(0, 5);
    form.setValue("images", combinedFiles, {
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
          location: values.location,
        }),
      ).unwrap();

      if (formOutput.images && formOutput.images.length > 0) {
        const formData = new FormData();

        formOutput.images.forEach((image) => {
          formData.append("images", image);
        });
        await dispatch(
          uploadImageFiles({
            projectId: projectData._id,
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

  return (
    <>
      <ProjectForm
        form={form}
        onSubmit={onSubmit}
        onFileChange={handleFileChange}
        onCancel={() => navigate("/")}
        title="Project Details"
        isSubmitting={isLoading || isUploading}
      />
    </>
  );
};

export default Upload;
