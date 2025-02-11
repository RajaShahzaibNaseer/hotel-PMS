import { useState, useEffect } from "react";
import "./PaxRates.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const PaxRates = () => {

  const [paxRates, setpaxRates] = useState([]);
  const [paxRateName, setpaxRateName] = useState("");
  const [paxRatePrice, setpaxRatePrice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { paxRateName, paxRatePrice };
      const response = await fetch("http://localhost:5000/paxrates", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  //delete meal plan function
  const deletepaxRate = async id =>{
    try {

      const deletepaxRate = await fetch(`http://localhost:5000/paxrates/${id}` , {
        method: "DELETE"
      });

      setpaxRates(paxRates.filter(paxRate => paxRate.paxRaterateid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getpaxRates = async () => {
    try {
      const response = await fetch("http://localhost:5000/paxrates");
      const jsonData = await response.json();

      setpaxRates(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getpaxRates();
  });

  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="paxRateName" value={paxRateName} onChange={e => setpaxRateName(e.target.value)} />
          <input type="text" name="paxRatePrice" value={paxRatePrice} onChange={e => setpaxRatePrice(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
        <button onClick={() => navigate("/floors")}>Floors</button>
        <button onClick={() => navigate("/conferenceRooms")}>Conference Rooms</button>
        <button onClick={() => navigate("/departments")}>Departments</button>
        <button onClick={() => navigate("/jobs")}>Jobs</button>
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
        <button onClick={() => navigate("/admin")}>Blocks</button>
        <button onClick={() => navigate("/guests")}>guests</button>
        <button onClick={() => navigate("/rooms")}>Rooms</button>
        <button onClick={() => navigate("/roomtypes")}>Room Types</button>

      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Pax Rate ID</th>
              <th>Pax Rate Name</th>
              <th>Pax Rate Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {paxRates.map(paxRate => (
              <tr key={paxRate.paxrateid}>
                <td>{paxRate.paxrateid}</td>
                <td>{paxRate.paxratename}</td>
                <td>{paxRate.price}</td>
                <td><button onClick={() => deletepaxRate(paxRate.paxrateid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaxRates;