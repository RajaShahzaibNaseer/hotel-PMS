import { useState, useEffect } from "react";
import "./ShowAgents.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const ShowAgents = () => {

  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();


  const deleteAgent = async id =>{
    try {

      const deleteAgent = await fetch(`http://localhost:5000/agents/${id}` , {
        method: "DELETE"
      });

      setAgents(agents.filter(agent => agent.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getAgent = async () => {
    try {
      const response = await fetch("http://localhost:5000/agents");
      const jsonData = await response.json();

      setAgents(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getAgent();
  });

  return (
    <div className="agentlist-container">
      <nav className="horizontal-navbar">
        <h2>Welcome, Admin</h2>
        <button onClick={() => navigate("/agents")}>Add Data</button>
        <button onClick={() => navigate("/clientlist")}>Go Back</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Agency Name</th>
              <th>Agent Full Name</th>
              <th>Registration No</th>
              <th>Tax ID No</th>
              <th>Physical Address</th>
              <th>Agency Email</th>
              <th>Agency Phone No</th>
              <th>Website</th>
              <th>Full Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.id}</td>
                  <td>{agent.agencyname}</td>
                  <td>{agent.agentfullname}</td>
                  <td>{agent.registrationno}</td>
                  <td>{agent.taxidentificationno}</td>
                  <td>{agent.physicaladdress}</td>
                  <td>{agent.agencyemail}</td>
                  <td>{agent.agencyphoneno}</td>
                  <td>{agent.website}</td>
                  <td>{agent.fullname}</td>
                  <td>{agent.designation}</td>
                  <td>{agent.email}</td>
                  <td>{agent.phoneno}</td>
                  <td>{agent.created_at}</td>
                  <td><button onClick={() => deleteAgent(agent.id)}>Delete</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowAgents;