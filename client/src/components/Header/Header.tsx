import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import { useState } from "react";
import { useAppSelector } from "../../store";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../UI/Button";
import { UploadIcon } from "../UI/icons";

const Header = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="bg-white dark:bg-gray-900  dark:border-gray-700">
      <div className="container mx-auto px-12 py-6 flex justify-between items-center ">
        <div className="lg:flex ">
          <div className="flex items-center space-x-4 ">
            <Link to={ROUTES.HOME}>
              <h1 className="font-logo text-3xl transition-all duration-300 hover:opacity-80 ">
                Archport
              </h1>
            </Link>

            <div className="flex lg:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 "
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <nav
            className={`${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            } absolute inset-x-0 z-20 mt-11 w-full px-8 py-6 transition-all duration-300 ease-in-out bg-white shadow-md dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent lg:shadow-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-8">
              <Link
                to="#"
                className="lg:ml-12 block font-semibold text-sm dark:text-gray-200 lg:mx-2 hover:opacity-70 hover:text-gray-900 dark:hover:text-gray-400 "
              >
                Why us?
              </Link>
              <Link
                to="#"
                className=" block font-semibold text-sm dark:text-gray-200 lg:mx-4 hover:opacity-70 hover:text-gray-900 dark:hover:text-gray-400 "
              >
                Projects
              </Link>
              <Link
                to={ROUTES.DETAILS}
                className="block font-semibold text-sm dark:text-gray-200 lg:mx-4 hover:opacity-70 dark:hover:text-gray-400 "
              >
                Blogs
              </Link>
              <Link
                to={ROUTES.DETAILS}
                className="block font-semibold text-sm dark:text-gray-200 lg:mx-4 hover:opacity-70 dark:hover:text-gray-400 "
              >
                Firms
              </Link>
            </div>
          </nav>
        </div>

        <div className="flex flex-row items-center space-x-4 ">
          {isAuthenticated && (
            <Button
              onClick={() => navigate(ROUTES.UPLOADPROJECT)}
              size="sm"
              variant="outline"
              icon={<UploadIcon />}
              className="font-bold "
            >
              Upload Project
            </Button>
          )}
          {!isAuthenticated ? (
            <>
              <Button
                onClick={() => {
                  navigate(ROUTES.SIGNUP);
                }}
                size="md"
                variant="outline"
                className=""
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                }}
                size="md"
                variant="primary"
                className=""
              >
                Log In
              </Button>
            </>
          ) : (
            <Dropdown />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
