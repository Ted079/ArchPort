import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import { useState } from "react";
import { useAppSelector } from "../../store";
import Dropdown from "../Dropdown/Dropdown";

const Header = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex justify-between items-center px-6 py-6">
        {/* Logo and Nav Left */}
        <div className="flex items-center space-x-4 lg:space-x-8">
          {/* Logo Mobile & Desktop */}
          <Link to={ROUTES.HOME}>
            <img
              className="w-auto h-6 sm:h-7"
              src="https://merakiui.com/images/full-logo.svg"
              alt=""
            />
          </Link>

          {/* Nav Desktop */}
          <nav
            className={`${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent lg:shadow-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-8">
              <Link
                to="#"
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
              >
                Why us?
              </Link>
              <Link
                to={ROUTES.DETAILS}
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
              >
                Details
              </Link>
            </div>
          </nav>
        </div>

        {/* Burger Menu Mobile */}
        <div className="flex lg:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
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

        {/* Auth Right - Desktop */}
        <div className="lg:flex lg:flex-row lg:items-center lg:space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to={ROUTES.SIGNUP}
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
              >
                Sign Up
              </Link>
              <Link
                to={ROUTES.LOGIN}
                className="flex items-center justify-center px-5 py-2 text-sm font-medium tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Log In
              </Link>
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
