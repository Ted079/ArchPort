import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logOut } from "../../store/user/authSlice";
import { useMediaQuery } from "react-responsive";
import { ROUTES } from "../../utils/route";
import { UseClickOutside } from "../../hooks/UseClickOutside";

const Dropdown = () => {
  const [open, setIsOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const mouseEnterHandler = () => isDesktop && setIsOpen(true);
  const mouseLeaveHandler = () => isDesktop && setIsOpen(false);

  UseClickOutside(ref, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative inline-block " ref={ref}>
      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={toggleOpen}
        className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
      >
        <div className="flex items-center gap-x-6">
          <img
            className="object-cover w-10.5 h-10.5 rounded-full ring ring-gray-300 dark:ring-gray-600  transition duration-200 
               focus:brightness-105 hover:brightness-105"
            src={user?.avatar}
            alt="avatar"
          />
        </div>
      </div>

      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        className={`
          absolute right-0 z-20 w-76 py-2 mt-0 overflow-hidden origin-top-right 
          bg-white rounded-md shadow-xl dark:bg-gray-800 transition-all duration-200
    ${
      open
        ? "opacity-100 scale-100 translate-y-0"
        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
    }
  `}
      >
        <Link
          to={ROUTES.PROFILE}
          className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <img
            className="flex-shrink-0 object-cover mx-1 rounded-full w-12 h-12"
            src={user?.avatar}
            alt="avatar"
          />
          <div className="mx-1">
            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {user?.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        </Link>

        <hr className="border-gray-200 dark:border-gray-700 " />

        <Link
          to={ROUTES.PROFILE}
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          view profile
        </Link>

        <Link
          to={ROUTES.UPLOADPROJECT}
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Upload Project
        </Link>

        <hr className="border-gray-200 dark:border-gray-700 " />

        <Link
          to="#"
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Settings
        </Link>
        <button
          onClick={() => {
            dispatch(logOut());
          }}
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
