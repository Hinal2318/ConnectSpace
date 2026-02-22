import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/details/all");
      setDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h2 className="home-title">Community Posts</h2>

        {details.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          details.map((items) => (
            <div key={items._id} className="post-cart">
              <h3>{items.name}</h3>
              <p className="email">{items.email}</p>
              <p>{items.description}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;