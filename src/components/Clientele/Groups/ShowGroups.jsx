import { useState, useEffect } from "react";
import "./ShowGroups.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const ShowGroups = () => {

  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();


  const deleteGroups = async id =>{
    try {
      const deleteGroups = await fetch(`http://localhost:5000/groups/${id}` , {
        method: "DELETE"
      });

      setGroups(groups.filter(group => group.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getGroups = async () => {
    try {
      const response = await fetch("http://localhost:5000/groups");
      const jsonData = await response.json();

      setGroups(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getGroups();
  });

  return (
    <div className="grouplist-container">
      <nav className="horizontal-navbar">
        <h2>Welcome, Admin</h2>
        <button onClick={() => navigate("/groups")}>Add Data</button>
        <button onClick={() => navigate("/clientlist")}>Go Back</button>
      </nav>
      <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Group Name</th>
                    <th>Associated With</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Created At</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {groups.map((group) => (
                <tr key={group.id}>
                    <td>{group.id}</td>
                    <td>{group.groupname}</td>
                    <td>{group.associatedwith}</td>
                    <td>{group.fullname}</td>
                    <td>{group.email}</td>
                    <td>{group.phoneno}</td>
                    <td>{group.created_at}</td>
                    <th><button onClick = {() => deleteGroups(group.id)} type="button">Delete</button></th>
                </tr>
                ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default ShowGroups;