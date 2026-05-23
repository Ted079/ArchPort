import { useParams, useSearchParams } from "react-router-dom";
import ProjectList from "../../components/Project/ProjectList";
import { useGetProjectsWithFiltersQuery } from "../../store/api/projectSlice";
import CategoriesList from "../../components/Categories/CategoriesList";

const SingleCategory = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "-views";

  const { data, isLoading, isError } = useGetProjectsWithFiltersQuery({
    category: category,
    sort: sort,
  });

  const handleSortChange = (value: string) => {
    setSearchParams({ sort: value ?? "-views" });
  };

  const categoryItems = data?.projects ?? [];

  if (isError) return <div>Server Error</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <CategoriesList sort={sort} onSortChange={handleSortChange} />
      <ProjectList items={categoryItems} />
    </>
  );
};

export default SingleCategory;
