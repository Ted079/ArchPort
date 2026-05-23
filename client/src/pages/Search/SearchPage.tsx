import ProjectList from "../../components/Project/ProjectList";
import { useGetProjectsWithFiltersQuery } from "../../store/api/projectSlice";
import CategoriesList from "../../components/Categories/CategoriesList";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IProject } from "../../../../shared/types";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [allProject, setAllProject] = useState<IProject[]>([]);

  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  const { data, isLoading, isError } = useGetProjectsWithFiltersQuery({
    search: query,
    category: category,
    sort: sort,
    page: page,
  });

  console.log(data?.pagination);
  //  SearchPage.tsx:26 {total: 24, page: 1, pages: 2, limit: 12}
  const searchData = data?.projects ?? [];

  useEffect(() => {
    if (data?.projects) {
      if (data.pagination.page === 1) {
        setAllProject(data.projects);
      } else {
        setAllProject((prev) => [...prev, ...data.projects]);
      }
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
    setAllProject([]);
  }, [query, category, sort]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasMoreProject = data?.pagination
    ? data.pagination.page < data?.pagination.pages
    : false;

  const handleCategorySelect = (cat: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (cat) {
      newParams.set("category", cat);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  const handleSortSelect = (val: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", val);
    setSearchParams(newParams);
  };

  if (isError) return <div>Server Error</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <CategoriesList
        activeCategory={category}
        onCategorySelect={handleCategorySelect}
        sort={sort}
        onSortChange={handleSortSelect}
      />
      {searchData.length > 0 ? (
        <ProjectList
          items={allProject}
          showLoadMore={true}
          onLoadMore={handleLoadMore}
          hasMore={hasMoreProject}
        />
      ) : (
        <div className="text-center py-20 text-gray-500">
          No projects found for "{query}"
        </div>
      )}
    </>
  );
};

export default SearchPage;

// cat ? { q: query ?? "", category: cat } : { q: query ?? "" },
