import { useState, useEffect } from "react";
import "./JobTitles.css";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const JobTitles = () => {

  const [department, setDepartment] = useState("");
  const [jobTitles, setjobTitles] = useState([]);
  const [jobTitleName, SetjobTitleName] = useState("");
  const [departmentID, setDepartmentID] = useState();
  const[departmentName, setdepartmentName] = useState("");
  const navigate = useNavigate();


  //adding jobTitles
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { jobTitleName, departmentID };
      const response = await fetch("http://localhost:5000/jobTitle", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  //delete jobTitles function
  const deletejobTitle = async id =>{
    try {

      const deletejobTitle = await fetch(`http://localhost:5000/jobTitle/${id}` , {
        method: "DELETE"
      });

      setjobTitles(jobTitles.filter(jobTitle => jobTitle.jobTitleid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getjobTitles = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobTitle");
      const jsonData = await response.json();

      setjobTitles(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getDepartment = async id =>
  {
    const response = await fetch(`http://localhost:5000/departments/${id}`);
    const jsonData = await response.json();
    console.log(jsonData);
    setDepartment(jsonData);
  }


  useEffect(() => {
    getjobTitles();

    const showDepartment = id =>
      {
        getDepartment(id);
        setDepartmentName(department.Departmentname);
        return (
          <p>{departmentName}</p>
        );
      }

  });
  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="jobTitlename" value={jobTitleName} onChange={e => SetjobTitleName(e.target.value)} />
          <input type="text" name="departmentid" value={departmentID} onChange={e => setDepartmentID(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
        <button onClick={() => navigate("/admin")}>Blocks</button>
        <button onClick={() => navigate("/conferenceRooms")}>Conference Rooms</button>
        <button onClick={() => navigate("/departments")}>Departments</button>
        <button onClick={() => navigate("/floors")}>Floors</button>
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
        <button onClick={() => navigate("/mealplanrates")}>Meal Plans</button>
        <button onClick={() => navigate("/guests")}>guests</button>
        <button onClick={() => navigate("/rooms")}>Rooms</button>
        <button onClick={() => navigate("/roomtypes")}>Room Types</button>

      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>jobTitleID</th>
              <th>jobTitle Name</th>
              <th>Department Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {jobTitles.map(jobTitle => (
              <tr key={jobTitle.jobtitleid}>
                <td>{jobTitle.jobtitleid}</td>
                <td>{jobTitle.jobtitlename}</td>
                <td>{jobTitle.departmentid}</td>
                <td><button onClick={() => deletejobTitle(jobTitle.jobtitleid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTitles;