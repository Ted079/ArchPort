import { useParams } from "react-router-dom";
import ProjectList from "../../components/Project/ProjectList";
import { useGetProjectByCategoryQuery } from "../../store/api/projectSlice";

const SingleCategory = () => {
  const { category } = useParams();
  console.log(category);
  const {
    data: categoryItems = [],
    isLoading,
    isError,
  } = useGetProjectByCategoryQuery(category!, {
    skip: !category,
  });

  if (isError) return <div>Server Error</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <ProjectList items={categoryItems} />
    </>
  );
};

export default SingleCategory;
