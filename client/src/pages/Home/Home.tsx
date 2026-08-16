import Hero from "../../components/Header/Hero";
import CategoriesList from "../../components/Categories/CategoriesList";
import ProjectList from "../../components/Project/ProjectList";
import UploadProjectSection from "../../components/Header/UploadProjectSection";
import { useGetProjectsWithFiltersQuery } from "../../store/api/projectSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetProjectsWithFiltersQuery({
    sort: "-views",
  });

  const heroData = useGetProjectsWithFiltersQuery({
    sort: "-CreatedAt",
  });

  const items = data?.projects ?? [];
  const heroItems = heroData.data?.projects ?? [];

  if (isError) {
    return <div>Error..</div>;
  }

  return (
    <div>
      <Hero items={heroItems} />
      <UploadProjectSection />
      <CategoriesList />
      <ProjectList
        items={items}
        showLoadMore={true}
        hasMore={true}
        onLoadMore={() => navigate("/projects")}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
