import { useSearchParams } from "react-router-dom";
import ProjectList from "../../components/Project/ProjectList";
import { useGetProjectsWithFiltersQuery } from "../../store/api/projectSlice";
import CategoriesList from "../../components/Categories/CategoriesList";
import { useEffect, useState } from "react";
import type { IProject } from "../../../../shared/types";

const AllProjects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "-views";
  const category = searchParams.get("category");

  const [page, setPage] = useState(1);
  const [allProjects, setAllProjects] = useState<IProject[]>([]);

  const { data, isLoading, isError } = useGetProjectsWithFiltersQuery({
    category: category,
    sort: sort,
    page: page,
  });


  useEffect(() => {
    if (data?.projects) {
      if (data.pagination.page === 1) {
        setAllProjects(data.projects);
      } else {
        setAllProjects((prev) => [...prev, ...data.projects]);
      }
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  let hasMoreProjeсt: boolean = false;
  if (data?.pagination) {
    if (data.pagination.page < data?.pagination.pages) {
      hasMoreProjeсt = true;
    }
  }

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value ?? "-views");
    setSearchParams(newParams);
  };

  const handleCategorySelect = (cat: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat) {
      newParams.set("category", cat);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  if (isError) return <div>Server Error</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <CategoriesList
        sort={sort}
        onSortChange={handleSortChange}
        onCategorySelect={handleCategorySelect}
        activeCategory={category}
      />
      <ProjectList
        items={allProjects}
        showLoadMore={true}
        onLoadMore={handleLoadMore}
        hasMore={hasMoreProjeсt}
      />
    </>
  );
};

export default AllProjects;
