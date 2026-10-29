import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";

function Setting() {
  const dispacth = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    location: user?.location,
  });

  return (
    <section className=" dark:bg-gray-900 mb-20 mt-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl ">
        <form
          className="w-full flex flex-col gap-6 lg:flex-row lg:gap-15"
          //   onSubmit={onSubmit}
        >
          <div className="w-full lg:w-1/4">
            <h2 className="text-lg font-semibold mb-2">Edit</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              This information is only visible to employees of your firm
            </p>
          </div>
          <div className="w-full lg:w-1/2   p-6  border border-gray-200 rounded-2xl">
            <div>
              <label className="block mb-3 font-medium  dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                className={`w-full py-2  px-4  rounded-lg  focus:outline-none border transition-all border-gray-300 focus:border-stone-500`}
                // className={`w-full py-2  px-4  rounded-lg  focus:outline-none border transition-all ${
                //   errors.title
                //     ? "border-red-500 "
                //     : "border-gray-300 focus:border-stone-500 "
                // }`}
                placeholder={userData.name}
              />
              {/* {errors.title && ( */}
              <p className="text-red-500 text-sm mt-1">
                {/* {errors.title.message} */}
              </p>
              {/* )} */}
            </div>
            <div className="mt-8">
              <label className="block mb-3 font-medium  dark:text-gray-200">
                Location
              </label>
              <input
                // {...register("location")}
                type="text"
                className="w-full py-2  px-4  rounded-lg  focus:outline-none border transition-all 
                     border-gray-200 focus:border-stone-500 "
                placeholder="Add location"
              />
            </div>

            {/* {errors.images && ( */}
            <p className="text-red-500 text-sm mt-1">
              {/* {errors.images.message} */}
            </p>
            {/* )} */}
            <div className="mt-8 ">
              <label className="block mb-2 mb-3 font-medium  dark:text-gray-200">
                Bio
              </label>
              <textarea
                // {...register("description")}
                // className={`block w-full py-2  rounded-lg px-4 focus:outline-none focus:ring focus:ring-opacity-40 border transition-all ${
                //   errors.description
                //     ? "border-red-500 focus:border-red-400 focus:ring-red-300"
                //     : "border-gray-300 focus:border-stone-400 focus:ring-stone-300"
                // }`}
                className={`block w-full py-2  rounded-lg px-4 focus:outline-none focus:ring focus:ring-opacity-40 border transition-all  "border-red-500 focus:border-red-400 focus:ring-red-300"
                    border-gray-300 focus:border-stone-400 focus:ring-stone-300
                }`}
                placeholder="Add project description "
                rows={5}
              />
              {/* {errors.description && ( */}
              <p className="text-red-500 text-sm mt-1">
                {/* {errors.description.message} */}
              </p>
              {/* )} */}
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-15 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between"></div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Setting;
