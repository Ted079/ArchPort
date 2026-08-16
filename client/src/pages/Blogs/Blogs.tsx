import React, { useEffect, useState } from "react";

// const API_KEY = "58f6f64da379452bb376d29801cf7129";
const RSS_URL = encodeURIComponent("https://www.archdaily.com/feed");
const Blogs = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    // const res = await fetch(
    //   `https://newsapi.org/v2/everything?q=architecture&language=ru&sortBy=publishedAt&apiKey=${API_KEY}`,
    // );
    const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&count=10`
      );

    const data = await res.json();
    setPosts(data.items);

    // articles[0].title, articles[0].urlToImage, articles[0].url, articles[0].publishedAt
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.url}>
          <h3>{post.title}</h3>
          <img src={post.thumbnail} alt={post.title} width={200} />
        </div>
      ))}
    </div>
  );
};

export default Blogs;
