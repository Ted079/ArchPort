import React from "react";
import SortDropdown from "../UI/SortDropdown";

const CategoriesList = () => {
  return (
    <div className="px-12  py-4">
      <div className="bg-[#f8f8fc] lg:flex lg:items-center justify-between cursor-pointer border border-[#f8f8fc] rounded-3xl flex  flex-col md:flex-row gap-3 sm:gap-4 p-5  shadow-xs">
        <div className="flex">
          <SortDropdown/>
        </div>
        <div className="flex overflow-x-auto overflow-y-hidden md:justify-center">
          <button className="h-12 px-8 py-2 text-sm text-center   font-semibold bg-transparent   sm:text-sm  whitespace-nowrap focus:outline-none">
            Architecture
          </button>

          <button className="h-12 px-8 py-2  text-sm text-center   font-semibold bg-transparent      sm:text-sm dark:text-white whitespace-nowrap cursor-base focus:outline-none  ">
            Interior
          </button>
          <button className="h-12 px-8 py-2  text-sm text-center   font-semibold bg-transparent      sm:text-sm dark:text-white whitespace-nowrap cursor-base focus:outline-none  ">
            Landscape
          </button>
          <button className="h-12 px-8 py-2  text-sm text-center   font-semibold bg-transparent      sm:text-sm dark:text-white whitespace-nowrap cursor-base focus:outline-none  ">
            Urban
          </button>
          <button className="h-12 px-8 py-2  text-sm text-center   font-semibold bg-transparent      sm:text-sm dark:text-white whitespace-nowrap cursor-base focus:outline-none  ">
            Industrial
          </button>

          <button className="h-12 px-8 py-2  text-sm text-center   font-semibold bg-transparent      sm:text-sm dark:text-white whitespace-nowrap cursor-base focus:outline-none  ">
            Renovation
          </button>

          <button className="h-12 px-8 py-2  text-sm text-center   font-semibold bg-transparent      sm:text-sm dark:text-white whitespace-nowrap cursor-base focus:outline-none  ">
            Conceptual
          </button>

          <button className="h-12 px-8 py-2  text-sm text-center   font-semibold bg-transparent      sm:text-sm dark:text-white whitespace-nowrap cursor-base focus:outline-none  ">
            Residential
          </button>

          <button className="h-12 px-8 py-2  text-sm text-center   font-semibold bg-transparent      sm:text-sm dark:text-white whitespace-nowrap cursor-base focus:outline-none  ">
            Commercial
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;

// Используй query параметры в уже существующем getAllProjects.
