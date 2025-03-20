import React, { useState, useEffect } from "react";

const Fetchapi = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="Main_content container d-flex flex-wrap justify-content-evenly">
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="card mt-3" style={{ width: "18rem" }}>
            <img src={post.image || "https://via.placeholder.com/150"} className="card-img-top" alt="Post Thumbnail" />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <a href={`/post/show/${post.id}`} className="btn btn-primary">Read More</a>
              <button
                className="btn btn-secondary mt-2"
                onClick={() => handleCardClick(post.id)}
              
                View Details
                ></button>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Fetchapi;
