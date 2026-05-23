import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import { UploadIcon } from "../UI/icons";

//change to upload blog then create blog page and need to write logic for choose project type
const UploadProjectSection = () => {
  return (
    <>
      <div className="max-w-full  sm:px-16  py-4 ">
        <Link
          to={ROUTES.PROJECT_CREATE}
          className="flex flex-col sm:flex-row items-center p-2 bg-stone-50 rounded-2xl gap-4 shadow-xs"
        >
          <div className="relative w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-stone-950 text-stone-50  rounded-3xl hover:bg-stone-800 transition-colors duration-200">
              {/* <span className="text-stone-400">✦</span> */}
              <span className="text-white">✦</span>
              <span className="font-medium tracking-tight">
                Start a Project Brief
              </span>
            </button>
            <span className="absolute -top-2 -right-2 bg-stone-200 text-stone-900 text-[10px] px-2 py-0.5 rounded-md font-bold border border-stone-300">
              NEW
            </span>
          </div>

          <p className="text-stone-600 text-sm px-2">
            {/* Tell us what you need and instantly connect with talent. */}
            Add your projects to your portfolio and showcase your work.
          </p>
        </Link>
        {/* <Link
          to={ROUTES.PROJECT_CREATE}
          className="bg-stone-100 lg:flex lg:items-center  cursor-pointer border border-[#f8f8fc] rounded-3xl flex  flex-col md:flex-row gap-3 sm:gap-4 p-5  shadow-xs"
        >
          <Button
            size="sm"
            variant="upload"
            icon={<UploadIcon />}
            className="font-bold w-48 sm:py-2 sm:pl-7 border-[#d9caf1] "
          >
            Upload Project
          </Button>
          <p className="text-xs sm:text-sm sm:font-thin text-gray-700 leading-relaxed ml-6 mt-2">
            Add your projects to your portfolio and showcase your work
          </p>
        </Link> */}
      </div>
    </>
  );
};

export default UploadProjectSection;
