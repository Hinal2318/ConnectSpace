import React, { useState } from "react";
import axios from "axios";
import "./AddDetails.css";
import Navbar from "../components/Navbar";   
import { useNavigate } from "react-router-dom";

const AddDetails = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:5000/api/details/add",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 201) {
      alert("Detail Added!");
      setForm({ name: "", email: "", description: "" });
      navigate("/home"); 
    }
  } catch (error) {
    console.error(error);
    alert("Check if your server is running or if you are logged in.");
  }
};
  return (
    <>
      
      <Navbar />

      <div className="add-container">
        <form className="add-box" onSubmit={handleSubmit}>
          <h2>Add Detail</h2>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddDetails;