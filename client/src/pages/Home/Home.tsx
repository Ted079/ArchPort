import Hero from "../../components/Header/Hero";
import CategoriesList from "../../components/Categories/CategoriesList";
import ProjectList from "../../components/Project/ProjectList";
import UploadProjectSection from "../../components/Header/UploadProjectSection";
import { useGetProjectsWithFiltersQuery } from "../../store/api/projectSlice";

const Home = () => {
  const { data, isError, isLoading } = useGetProjectsWithFiltersQuery({
    sort: "-views",
  });

  const items = data?.projects ?? [];

  if (isError) {
    return <div>Error..</div>;
  }

  return (
    <div>
      <Hero items={items} />
      <UploadProjectSection />
      <CategoriesList />
      <ProjectList items={items} showLoadMore={true} isLoading={isLoading} />
    </div>
  );
};

export default Home;
