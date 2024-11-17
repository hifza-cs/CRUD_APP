import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to delete user
  const deleteUser = async (userid) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${userid}`);
      // Update the state to remove the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userid));
      toast.success("User deleted successfully", { position: 'top-right' });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user", { position: 'top-right' });
    }
  };

  return (
    <div className="userTable">
      <Link to="/add" className="addButton">
        Go to Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}> {/* Ensure each row has a unique key */}
              <td>{index + 1}</td>
              <td>{user.firstname} {user.lastname}</td>
              <td>{user.email}</td>
              <td className="actionButton">
                <button onClick={() => deleteUser(user._id)}>Delete</button>
                <Link to={`/edit/${user._id}`}>Edit</Link> {/* Dynamic link to edit each user */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
