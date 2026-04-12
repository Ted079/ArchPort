import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProjByCat } from "../../store/project/projectSlice";
import ProjectList from "../../components/Project/ProjectList";

const SingleCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  console.log(category);
  const { categoryItems, isLoading } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (category) {
      dispatch(getProjByCat(category));
    }
  }, [dispatch]);
  if (isLoading) return "Loading";

  return (
    <>
      <ProjectList items={categoryItems} />
    </>
  );
};

export default SingleCategory;
