import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  const [details, setDetails] = useState([]);
  const[commentText,setCommentText]=useState("");

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

  const addComment=async(id)=>{
    const token=localStorage.getItem("token");
    try{
    await axios.post(`http://localhost:5000/api/details/comment/${id}`,
      {text:commentText},
      {headers:{Authorization:`Bearer ${token}`}}
    );
    fetchDetails();
    setCommentText("");
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) return alert("Please login first");

  if (!window.confirm("Are you sure you want to delete this post?")) return;

  try {
    const res = await axios.delete(`http://localhost:5000/api/details/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      alert("Post Deleted");
      fetchDetails(); 
    }
  } catch (err) {
    console.error("Delete error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to delete post");
  }
};

const handleLike = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.post(
      `http://localhost:5000/api/details/like/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchDetails();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h2 className="home-title">Community Posts</h2>

        {details.length === 0 ? (
          <p className="no-posts">No posts yet</p>
        ) : (
          details.map((items) => (
            <div key={items._id} className="post-box">
              
              <div className="post-header">
                <div className="avatar">
                  {items.name ? items.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="user-meta">
                  <h3>{items.name}</h3>
                  <p className="post-email">{items.email}</p>
                  <button className="delete-btn" onClick={() => deletePost(items._id)}>🗑️</button>
                </div>
              </div>

              
              <div className="post-content">
                <p>{items.description}</p>
                 <button 
                className="like-btn"
                onClick={() => handleLike(items._id)}
                >
               ❤️ {items.likes ? items.likes.length : 0}
               </button>
              </div>

            
              <div className="post-footer">
                <div className="comment-input-row">
                  <input
                    placeholder="Write a comment..."
                    value={commentText} 
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button onClick={() => addComment(items._id)}>Post</button>
                </div>

                <div className="comments-list">
                  {items.comments?.map((c, i) => (
                    <div key={i} className="comment-item">
                      <span className="comment-user">{c.user?.name || "Anonymous"}:</span> {c.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;

