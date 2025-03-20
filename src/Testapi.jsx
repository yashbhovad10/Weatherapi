import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const TestApi = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let api = "https://jsonplaceholder.typicode.com/posts";

        fetch(api)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    return (
        <>
            <div className="container d-flex flex-wrap" id="main">
                {posts.map((value) => (
                    <div className="card mx-2 my-4" style={{ width: "18rem" }} key={value.id}>
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Placeholder" />
                        <div className="card-body">
                            <h5 className="card-title">{value.title}</h5>
                            <p className="card-text">{value.body}</p>
                            <NavLink to={`/posts/show/${value.id}`} className="btn btn-primary">
                                Show Post
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TestApi;




