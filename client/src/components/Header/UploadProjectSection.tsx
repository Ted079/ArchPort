import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import { UploadIcon } from "../UI/icons";

//change to upload blog then create blog page and need to write logic for choose project type
const UploadProjectSection = () => {
  return (
    <div className="sm:px-12  py-4 ">
      <Link
        to={ROUTES.UPLOADPROJECT}
        className="bg-[#f8f8fc] lg:flex lg:items-center  cursor-pointer border border-[#f8f8fc] rounded-3xl flex  flex-col md:flex-row gap-3 sm:gap-4 p-5  shadow-xs"
      >
        <Button
          size="sm"
          variant="upload"
          icon={<UploadIcon />}
          className="font-bold w-48 sm:py-2 sm:pl-7"
        >
          Upload Project
        </Button>
        <p className="text-xs sm:text-sm sm:font-thin text-gray-700 leading-relaxed ml-6 mt-2">
          Add your projects to your portfolio and showcase your work
        </p>
      </Link>
    </div>
  );
};

export default UploadProjectSection;
