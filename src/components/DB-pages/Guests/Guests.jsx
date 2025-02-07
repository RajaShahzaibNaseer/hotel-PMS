import { useState, useEffect } from "react";
import "./Guests.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const Guests = () => {

  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState("");
  const [guestProfile, setGuestProfile] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const profiles = ["individual", "company", "group", "agent"];
        if(profiles.some(w => w.toLowerCase() == guestProfile.toLowerCase()))
        {
            const body = { guestName, guestProfile };
            const response = await fetch("http://localhost:5000/guests", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body),
            });
            console.log(response);
        }
    } catch (error) {
      console.error(error.message);
    }
  }
  
  //delete meal plan function
  const deleteGuest = async id =>{
    try {

      const deleteGuest = await fetch(`http://localhost:5000/guests/${id}` , {
        method: "DELETE"
      });

      setGuests(guests.filter(Guest => Guest.guestID !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getGuests = async () => {
    try {
      const response = await fetch("http://localhost:5000/guests");
      const jsonData = await response.json();

      setGuests(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getGuests();
  });

  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="guestName" value={guestName} onChange={e => setGuestName(e.target.value)} />
          <input type="text" name="guestProfile" value={guestProfile} onChange={e => setGuestProfile(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
        <button onClick={() => navigate("/floors")}>Floors</button>
        <button onClick={() => navigate("/conferenceRooms")}>Conference Rooms</button>
        <button onClick={() => navigate("/departments")}>Departments</button>
        <button onClick={() => navigate("/jobs")}>Jobs</button>
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
        <button onClick={() => navigate("/admin")}>Blocks</button>
        <button onClick={() => navigate("/mealplanrates")}>Meal Plans</button>
        <button onClick={() => navigate("/rooms")}>Rooms</button>
        <button onClick={() => navigate("/roomtypes")}>Room Types</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Guest ID</th>
              <th>Guest Name</th>
              <th>Guest Profile</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(Guest => (
              <tr key={Guest.guestid}>
                <td>{Guest.guestid}</td>
                <td>{Guest.guestname}</td>
                <td>{Guest.guestprofile}</td>
                <td><button onClick={() => deleteGuest(Guest.guestid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Guests;