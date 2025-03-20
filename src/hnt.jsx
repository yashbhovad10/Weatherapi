import React, { useState, useEffect } from "react";

const FetchAPI = () => {
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    const api = "https://jsonplaceholder.typicode.com/todos";

    fetch(api)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); 

  return (
    
    <div className="Main_content container d-flex flex-wrap justify-content-evenly">
      
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className=" card mt-3" style={{ width: "18rem" }}>
            <img src=" " className="card-img-top" alt="Post Thumbnail" />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <a href="#" className="btn btn-primary">Read More</a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FetchAPI;