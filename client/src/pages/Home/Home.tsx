import { useEffect } from "react";
import Hero from "../../components/Header/Hero";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProjects } from "../../store/project/projectSlice";
import CategoriesList from "../../components/Categories/CategoriesList";
import ProjectList from "../../components/Project/ProjectList";

const Home = () => {
  const dispacth = useAppDispatch();
  const { items } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispacth(getProjects());
  }, [dispacth]);
  return (
    <div>
      <CategoriesList />
      <ProjectList mode="home" items={items} />
    </div>
  );
};

export default Home;
