import { useState, useEffect } from "react";
import "./Departments.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const Departments = () => {

  const [departments, setDepartments] = useState([]);
  const [departmentname, setDepartmentName] = useState("")
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { departmentname };
      const response = await fetch("http://localhost:5000/departments", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  //delete blocks function
  const deleteDepartment = async id =>{
    try {

      const deleteDepartment = await fetch(`http://localhost:5000/departments/${id}` , {
        method: "DELETE"
      });

      setDepartments(departments.filter(department => department.departmentid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getDepartments = async () => {
    try {
      const response = await await fetch("http://localhost:5000/departments");
      const jsonData = await response.json();

      setDepartments(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDepartments();
  });

  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="departmentname" value={departmentname} onChange={e => setDepartmentName(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
        <button onClick={() => navigate("/floors")}>Floors</button>
        <button onClick={() => navigate("/conferenceRooms")}>Conference Rooms</button>
        <button onClick={() => navigate("/admin")}>Departments</button>
        <button onClick={() => navigate("/jobs")}>Jobs</button>
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
        <button onClick={() => navigate("/mealplanrates")}>Meal Plans</button>
        <button onClick={() => navigate("/guests")}>guests</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(department => (
              <tr key={department.departmentid}>
                <td>{department.departmentid}</td>
                <td>{department.departmentname}</td>
                <td><button onClick={() => deleteDepartment(department.departmentid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departments;