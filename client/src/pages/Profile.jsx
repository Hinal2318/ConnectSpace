import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://connect-space-api.onrender.com/api/details/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPosts(res.data);
  };

  return (
    <>
      <Navbar />
      <h2>My Posts</h2>
      {posts.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </>
  );
};

export default Profile;