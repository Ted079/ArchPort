// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ROUTES } from "../../utils/route";
// import { useState } from "react";
// import { useAppSelector } from "../../store";
// import Dropdown from "../Dropdown/Dropdown";
// import Button from "../UI/Button";
// import { UploadIcon } from "../UI/icons";
// import { CloseIcon } from "../UI/icons/CloseIcon";
// import { BurgerIcon } from "../UI/icons/BurgerIcon";
// import { Logo } from "../UI/Logo";
// import SearchForm from "../SeacrhForm/SearchForm";
// import UseScrolled from "../../hooks/UseScrolled";
// import { useMediaQuery } from "react-responsive";

// const Header = () => {
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const isScrolled = UseScrolled(500);

//   const isHomePage = useLocation().pathname === "/";
//   const showSearch = !isHomePage || isScrolled;
//   const isSticky = !isHomePage || isScrolled;

//   const isTable = useMediaQuery({ maxWidth: 768 });

//   const toggleMenu = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <header className={` z-40  bg-white  ${isSticky ? "sticky top-0" : ""} `}>
//       <div className=" max-w-full  mx-auto px-3 sm:px-10 py-6 flex flex-wrap justify-between items-center ">
//         <div className="lg:flex ">
//           <div className="flex items-center space-x-4  ">
//             <div className="flex lg:hidden ">
//               <button
//                 onClick={toggleMenu}
//                 type="button"
//                 className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 "
//                 aria-label="toggle menu"
//               >
//                 {!isOpen ? <BurgerIcon /> : <CloseIcon />}
//               </button>
//             </div>
//             <Link to={ROUTES.HOME}>
//               <Logo />
//             </Link>
//           </div>

//           {showSearch && !isTable && (
//             <div className="w-sm ml-8">
//               <SearchForm />
//             </div>
//           )}
//           <nav
//             className={`${
//               isOpen
//                 ? "translate-x-0 opacity-100"
//                 : "opacity-0 -translate-x-full"
//             } absolute inset-x-0 z-20 mt-11 w-full px-8 py-6 transition-all duration-300 ease-in-out bg-white shadow-md dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent lg:shadow-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
//           >
//             <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-8 ">
//               <Link
//                 to="#"
//                 className="lg:ml-12 block font-semibold text-sm dark:text-gray-200 lg:mx-2 hover:opacity-70 hover:text-gray-900 dark:hover:text-gray-400 "
//               >
//                 Why us?
//               </Link>
//               <Link
//                 to={ROUTES.PROJECTS}
//                 className=" block font-semibold text-sm dark:text-gray-200 lg:mx-4 hover:opacity-70 hover:text-gray-900 dark:hover:text-gray-400 "
//               >
//                 Projects
//               </Link>
//               <Link
//                 to={ROUTES.BLOGS}
//                 className="block font-semibold text-sm dark:text-gray-200 lg:mx-4 hover:opacity-70 dark:hover:text-gray-400 "
//               >
//                 Blogs
//               </Link>
//               <Link
//                 to={ROUTES.NOTFOUND}
//                 className="block font-semibold text-sm dark:text-gray-200 lg:mx-4 hover:opacity-70 dark:hover:text-gray-400 "
//               >
//                 Firms
//               </Link>
//             </div>
//           </nav>
//         </div>

//         <div className="flex flex-row items-center space-x-4 ">
//           {isAuthenticated && (
//             <Button
//               onClick={() => navigate(ROUTES.PROJECT_CREATE)}
//               size="sm"
//               variant="outline"
//               icon={<UploadIcon />}
//               className="font-bold hidden lg:flex"
//             >
//               Upload Project
//             </Button>
//           )}
//           {!isAuthenticated ? (
//             <>
//               <Button
//                 onClick={() => {
//                   navigate(ROUTES.SIGNUP);
//                 }}
//                 size="md"
//                 variant="outline"
//                 className="hidden md:flex"
//               >
//                 Sign Up
//               </Button>
//               <Button
//                 onClick={() => {
//                   navigate(ROUTES.LOGIN);
//                 }}
//                 size="md"
//                 variant="primary"
//                 className=""
//               >
//                 Log In
//               </Button>
//             </>
//           ) : (
//             <Dropdown />
//           )}
//         </div>
//       </div>
//       {/* {showSearch && isTable && (
//         <div className="w-full mr-25">
//           <SearchForm />
//         </div>
//       )} */}
//     </header>
//   );
// };

// export default Header;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import { useState } from "react";
import { useAppSelector } from "../../store";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../UI/Button";
import { UploadIcon } from "../UI/icons";
import { CloseIcon } from "../UI/icons/CloseIcon";
import { BurgerIcon } from "../UI/icons/BurgerIcon";
import { Logo } from "../UI/Logo";
import SearchForm from "../SeacrhForm/SearchForm";
import UseScrolled from "../../hooks/UseScrolled";

const Header = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isScrolled = UseScrolled(500);

  const isHomePage = useLocation().pathname === "/";
  const showSearch = !isHomePage || isScrolled;
  const isSticky = !isHomePage || isScrolled;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={` z-40  bg-white  ${isSticky ? "sticky top-0" : ""} `}>
      <div className="max-w-full mx-auto px-3 sm:px-10 py-6 flex flex-wrap items-center gap-y-4 lg:flex-nowrap">
        {/* LOGO + BURGER — order-1 всегда */}
        <div className="order-1 flex items-center space-x-4">
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 "
              aria-label="toggle menu"
            >
              {!isOpen ? <BurgerIcon /> : <CloseIcon />}
            </button>
          </div>
          <Link to={ROUTES.HOME}>
            <Logo />
          </Link>
        </div>

        {/* BUTTONS — order-2 на мобиле (сразу после логотипа, прижаты вправо через ml-auto), order-4 на десктопе */}
        <div className="order-2 ml-auto flex flex-row items-center space-x-4 lg:order-4">
          {isAuthenticated && (
            <Button
              onClick={() => navigate(ROUTES.PROJECT_CREATE)}
              size="sm"
              variant="outline"
              icon={<UploadIcon />}
              className="font-bold hidden lg:flex"
            >
              Upload Project
            </Button>
          )}
          {!isAuthenticated ? (
            <>
              <Button
                onClick={() => navigate(ROUTES.SIGNUP)}
                size="md"
                variant="outline"
                className="hidden md:flex"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => navigate(ROUTES.LOGIN)}
                size="md"
                variant="primary"
              >
                Log In
              </Button>
            </>
          ) : (
            <Dropdown />
          )}
        </div>

        {/* NAV — на мобиле absolute (не занимает место в потоке), на десктопе order-3 между search и buttons */}
        <nav
          className={`${
            isOpen
              ? "translate-x-0 opacity-100"
              : "opacity-0 -translate-x-full"
          } ml-8 order-3 absolute inset-x-0 z-20 mt-11 w-full px-8 py-6 transition-all duration-300 ease-in-out bg-white shadow-md dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent lg:shadow-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
        >
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-8 ">
            <Link
              to="#"
              className="block font-semibold text-sm dark:text-gray-200 lg:mx-2 hover:opacity-70 hover:text-gray-900 dark:hover:text-gray-400 "
            >
              Why us?
            </Link>
            <Link
              to={ROUTES.PROJECTS}
              className="block font-semibold text-sm dark:text-gray-200 lg:mx-4 hover:opacity-70 hover:text-gray-900 dark:hover:text-gray-400 "
            >
              Projects
            </Link>
            <Link
              to={ROUTES.BLOGS}
              className="block font-semibold text-sm dark:text-gray-200 lg:mx-4 hover:opacity-70 dark:hover:text-gray-400 "
            >
              Blogs
            </Link>
            <Link
              to={ROUTES.NOTFOUND}
              className="block font-semibold text-sm dark:text-gray-200 lg:mx-4 hover:opacity-70 dark:hover:text-gray-400 "
            >
              Firms
            </Link>
          </div>
        </nav>

        {/* SEARCH — order-4 на мобиле (переносится на новую строку, w-full), order-2 на десктопе (между логотипом и nav) */}
        {showSearch && (
          <div className="order-4 w-full lg:order-2 lg:w-sm lg:ml-8">
            <SearchForm />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;



