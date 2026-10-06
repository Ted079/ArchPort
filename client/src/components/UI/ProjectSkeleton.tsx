type Size = "sm" | "md" | "lg";
const sizes = {
   sm: "h-56",
  md: "h-72",
  lg: "h-80 md:h-100",
};

const ProjectSkeleton = ({
  value,
  size = "sm",
}: {
  value: number;
  className?: string;
  size?: Size;
}) => {
  return Array.from({ length: value }).map((_, i) => (
    <div className="w-full " key={i}>
      <div
        className={`w-full ${sizes[size]} bg-gray-200 rounded-lg dark:bg-gray-600`}
      ></div>

      <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
      <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    </div>
  ));
};

export default ProjectSkeleton;
