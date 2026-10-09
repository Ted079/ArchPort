// import React, { useEffect, useState } from "react";

// // const API_KEY = "58f6f64da379452bb376d29801cf7129";
// const RSS_URL = encodeURIComponent("https://www.archdaily.com/feed");
// const Blogs = () => {
//   const [posts, setPosts] = useState([]);

//   const getPosts = async () => {
//     // const res = await fetch(
//     //   `https://newsapi.org/v2/everything?q=architecture&language=ru&sortBy=publishedAt&apiKey=${API_KEY}`,
//     // );
//     const res = await fetch(
//         `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&count=10`
//       );

//     const data = await res.json();
//     setPosts(data.items);

//     // articles[0].title, articles[0].urlToImage, articles[0].url, articles[0].publishedAt
//   };
//   useEffect(() => {
//     getPosts();
//   }, []);
//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.url}>
//           <h3>{post.title}</h3>
//           <img src={post.thumbnail} alt={post.title} width={200} />
//         </div>
//       ))}
//     </div>
//   );
// };



// export default Blogs;

import React from 'react'

const Blogs = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto animate-pulse">
        <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                
                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>
        </div>
    </div>
</section>
  )
}

export default Blogs
