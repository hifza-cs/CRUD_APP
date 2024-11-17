import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Add.css";
import axios from "axios";
import toast from 'react-hot-toast';

const Add = () => {
  const initialUserState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Submitting User:", user);
    try {
      const response = await axios.post("http://localhost:8000/api/create", user);
      console.log("Response:", response);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log("Error Data:", error.response.data);
        console.log("Error Status:", error.response.status);
        toast.error(error.response.data.message || "Failed to create user", { position: "top-right" });
      } else {
        console.log("Error Message:", error.message);
        toast.error("An error occurred", { position: "top-right" });
      }
    } 
  };

  return (
    <div className="addUser">
      <h3>Add New User</h3>
      <Link to="/">Back</Link>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="firstname"
            name="firstname"
            autoComplete="off"
            placeholder="First name"
            value={user.firstname}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lastname"
            name="lastname"
            autoComplete="off"
            placeholder="Last name"
            value={user.lastname}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            value={user.email}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={inputHandler}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            value={user.password}
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
