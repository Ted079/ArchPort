const ProjectSkeleton = () => {
  return Array.from({ length: 8 }).map((_, i) => (
    <div className="w-full " key={i}>
      <div className="w-full h-56 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

      <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
      <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    </div>
  ));
};

export default ProjectSkeleton;
