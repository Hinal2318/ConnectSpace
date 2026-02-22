import React, { useState } from "react";
import axios from "axios";
import "./AddDetails.css";
import Navbar from "../components/Navbar";   

const AddDetails = () => {
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
      await axios.post(
        "http://localhost:5000/api/details/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Detail Added!");
    } catch (error) {
      console.log(error);
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
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddDetails;