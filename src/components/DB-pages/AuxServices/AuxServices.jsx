import { useState, useEffect } from "react";
import "./AuxServices.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const AuxServices = () => {

  const [service, setservice] = useState([]);
  const [serviceName, setserviceName] = useState("");
  const [servicePrice, setservicePrice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { serviceName, servicePrice };
      const response = await fetch("http://localhost:5000/services", {
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
  const deleteservice = async id =>{
    try {

      const deleteservice = await fetch(`http://localhost:5000/services/${id}` , {
        method: "DELETE"
      });

      setservice(service.filter(service => service.servicerateid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getservice = async () => {
    try {
      const response = await fetch("http://localhost:5000/services");
      const jsonData = await response.json();

      setservice(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getservice();
  });

  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="serviceName" value={serviceName} onChange={e => setserviceName(e.target.value)} />
          <input type="text" name="servicePrice" value={servicePrice} onChange={e => setservicePrice(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
        <button onClick={() => navigate("/floors")}>Floors</button>
        <button onClick={() => navigate("/conferenceRooms")}>Conference Rooms</button>
        <button onClick={() => navigate("/departments")}>Departments</button>
        <button onClick={() => navigate("/jobs")}>Services</button>
        <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
        <button onClick={() => navigate("/admin")}>Blocks</button>
        <button onClick={() => navigate("/mealplanrates")}>Meal Plan Rates</button>
        <button onClick={() => navigate("/guests")}>guests</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>service ID</th>
              <th>service Name</th>
              <th>service Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {service.map(service => (
              <tr key={service.serviceid}>
                <td>{service.serviceid}</td>
                <td>{service.servicename}</td>
                <td>{service.price}</td>
                <td><button onClick={() => deleteservice(service.serviceid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuxServices;