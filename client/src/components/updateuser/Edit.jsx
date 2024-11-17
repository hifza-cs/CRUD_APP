import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../adduser/Add.css";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Declare navigate once here

  // Initial user state
  const initialUserState = {
    firstname: "",
    lastname: "",
    email: ""
  };

  const [user, setUser] = useState(initialUserState);

  // Load user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getone/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  // Handle input change
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/update/${id}`, user);
      navigate("/");  // Navigate after updating
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className='addUser'>
      <h3>Update User</h3>
      <Link to={"/"}>Back</Link>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor='firstname'>First name</label>
          <input
            type='text'
            onChange={inputChangeHandler}
            id='firstname'
            name='firstname'
            value={user.firstname}
            autoComplete='off'
            placeholder='First name'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='lastname'>Last name</label>
          <input
            type='text'
            onChange={inputChangeHandler}
            id='lastname'
            name='lastname'
            value={user.lastname}
            autoComplete='off'
            placeholder='Last name'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            onChange={inputChangeHandler}
            id='email'
            name='email'
            value={user.email}
            autoComplete='off'
            placeholder='Email'
          />
        </div>
        <div className='inputGroup'>
          <button type='submit'>UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
