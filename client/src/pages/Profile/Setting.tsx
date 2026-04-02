import React from 'react'

function Setting() {
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
          <div className="w-full lg:w-1/2">
            <div>
              <label className="block mb-3 font-medium  dark:text-gray-200">
                Project Name
              </label>
              <input
                type="text"
                // className={`w-full py-2  px-4  rounded-lg  focus:outline-none border transition-all ${
                //   errors.title
                //     ? "border-red-500 "
                //     : "border-gray-300 focus:border-stone-500 "
                // }`}
                placeholder="Add project name"
              />
              {/* {errors.title && ( */}
                <p className="text-red-500 text-sm mt-1">
                  {/* {errors.title.message} */}
                </p>
              {/* )} */}
            </div>

          

            
            {/* {errors.images && ( */}
              <p className="text-red-500 text-sm mt-1">
                {/* {errors.images.message} */}
              </p>
            {/* )} */}
            <div className="mt-8 ">
              <label className="block mb-2 mb-3 font-medium  dark:text-gray-200">
                Description
              </label>
              <textarea
                // {...register("description")}
                // className={`block w-full py-2  rounded-lg px-4 focus:outline-none focus:ring focus:ring-opacity-40 border transition-all ${
                //   errors.description
                //     ? "border-red-500 focus:border-red-400 focus:ring-red-300"
                //     : "border-gray-300 focus:border-stone-400 focus:ring-stone-300"
                // }`}
                placeholder="Add project description "
                rows={5}
              />
              {/* {errors.description && ( */}
                <p className="text-red-500 text-sm mt-1">
                  {/* {errors.description.message} */}
                </p>
              {/* )} */}
            </div>
            <div className="mt-8  ">
              <span className="block mb-3 sm:mb-4 font-medium  dark:text-gray-200">
                Project type
              </span>
              <div className="flex flex-wrap gap-2">
                  <label className="cursor-pointer" >
                    <input
                      type="radio"
                      className="peer hidden"
                    />
                    <div
                      className="px-3 sm:px-6 py-1 py-2 rounded-full border text-xs sm:text-sm transition-all 
                        peer-checked:bg-[#333333] peer-checked:text-white
                        border-gray-300 hover:border-stone-400"
                    >
                    </div>
                  </label>
              </div>
              {/* {errors.category && ( */}
                <p className="text-red-500 text-sm mt-1">
                  {/* {errors.category.message} */}
                </p>
              {/* )} */}
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-15 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Setting