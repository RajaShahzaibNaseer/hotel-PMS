import { useState, useEffect } from "react";
import "./AdminPage.css";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AdminPage = () => {

  const [blocks, setBlocks] = useState([]);
  const [blockname, SetBlockName] = useState("")
  const navigate = useNavigate();


  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { blockname };
      const response = await fetch("http://localhost:5000/blocks", {
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
  const deleteBlock = async id =>{
    try {

      const deleteBlock = await fetch(`http://localhost:5000/blocks/${id}` , {
        method: "DELETE"
      });

      setBlocks(blocks.filter(block => block.blockid !== id));
    } catch (error) {

      console.error(error.message);
    }
  }

  const getBlocks = async () => {
    try {
      const response = await await fetch("http://localhost:5000/blocks");
      const jsonData = await response.json();

      setBlocks(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getBlocks();
  });

  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="blockname" value={blockname} onChange={e => SetBlockName(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
        <button onClick={() => navigate("/floors")}>Floors</button>
        <button onClick={() => navigate("/conferenceRooms")}>Conference Rooms</button>
        <button onClick={() => navigate("/departments")}>Departments</button>
        <button onClick={() => navigate("/jobs")}>Jobs</button>
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
        <button onClick={() => navigate("/mealplanrates")}>Meal Plans</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>BlockID</th>
              <th>Block Name</th>
              <th>options</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map(block => (
              <tr key={block.blockid}>
                <td>{block.blockid}</td>
                <td>{block.blockname}</td>
                <td><button onClick={() => deleteBlock(block.blockid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;