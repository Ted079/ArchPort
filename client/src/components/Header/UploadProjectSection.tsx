import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/route";

const UploadProjectSection = () => {
  return (
    <>
      <div className="max-w-full   py-4 ">
        {/* delete:  sm:px-16 */}
        <Link
          to={ROUTES.PROJECT_CREATE}
          className="flex flex-col sm:flex-row items-center p-2  bg-primary-background  rounded-2xl gap-4 shadow-xs"
        >
          <div className="relative w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-stone-850 bg-primary text-stone-50  rounded-3xl hover:bg-primary-hover transition-colors duration-200">
              {/* <span className="text-white">📁</span> */}
              {/* <span className="text-white">+</span> */}
              <span className="font-medium tracking-tight">
                Start Adding Your Project
              </span>
            </button>
            <span className="absolute -top-2 -right-2 bg-stone-200 text-stone-900 text-[10px] px-2 py-0.5 rounded-md font-bold border border-stone-300">
              NEW
            </span>
          </div>

          <p className="text-stone-600 text-sm px-2">
            Add your projects to your portfolio and showcase your work.
          </p>
        </Link>
      </div>
    </>
  );
};

export default UploadProjectSection;
