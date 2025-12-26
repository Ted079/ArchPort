import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { logOut } from "../../store/user/authSlice";
import { useMediaQuery } from "react-responsive";

const Dropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return (
    <div className="relative inline-block ">
      <div
        tabIndex={0}
        onMouseEnter={isDesktop ? () => setOpen(true) : undefined}
        onMouseLeave={isDesktop ? () => setOpen(false) : undefined}
        onFocus={() => (isDesktop ? setOpen(true) : undefined)}
        onBlur={() => (isDesktop ? setOpen(false) : undefined)}
        onClick={!isDesktop? (prev) => {!prev}: undefined}
        className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
      >
        <div className="flex items-center gap-x-6">
          <img
            className="object-cover w-12 h-12 rounded-full ring ring-gray-300 dark:ring-gray-600 "
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
            alt="avatar"
          />
        </div>
      </div>

      {open && (
        <div
          // @click.away="isOpen = false"
          x-transition:enter="transition ease-out duration-100"
          x-transition:enter-start="opacity-0 scale-90"
          x-transition:enter-end="opacity-100 scale-100"
          x-transition:leave="transition ease-in duration-100"
          x-transition:leave-start="opacity-100 scale-100"
          x-transition:leave-end="opacity-0 scale-90"
          className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
        >
          <Link
            to="#"
            className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <img
              className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
              src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
              alt="jane avatar"
            />
            <div className="mx-1">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Jane Doe
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                janedoe@exampl.com
              </p>
            </div>
          </Link>

          <hr className="border-gray-200 dark:border-gray-700 " />

          <Link
            to="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            view profile
          </Link>

          <Link
            to="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Settings
          </Link>

          <hr className="border-gray-200 dark:border-gray-700 " />

          <Link
            to="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Help
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
      )}
    </div>
  );
};

export default Dropdown;
