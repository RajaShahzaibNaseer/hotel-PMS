import { useState, useEffect } from "react";
import "./ShowGuests.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const ShowGuests = () => {

  const [guests, setGuests] = useState([]);
  const navigate = useNavigate();


  const deleteGuests = async id =>{
    try {

      const deleteGuest = await fetch(`http://localhost:5000/guests/${id}` , {
        method: "DELETE"
      });

      setGuests(guests.filter(guest => guest.id !== id));

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
    <div className="guests-container">
      <nav className="horizontal-navbar">
        <h2>Welcome, Admin</h2>
        <button onClick={() => navigate("/guests")}>Add Data</button>
        <button onClick={() => navigate("/clientlist")}>Go Back</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
                <th>Guest id</th>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Nationalty</th>
                <th>Identification No</th>
                <th>Expiry Date</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Residential Address</th>
                <th>Emergency Contact</th>
                <th>Emergency Phone</th>
                <th>Emergency Relationship</th>
                <th>Preferred Room Type</th>
                <th>Preferred Meal Plan</th>
                <th>Special Needs</th>
                <th>Previous Stays</th>
                <th>Loyalty Program</th>
                <th>Association</th>
                <th>Created At</th>
                <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.id}</td>
                <td>{guest.full_name}</td>
                <td>{new Date(guest.date_of_birth).toLocaleDateString()}</td>
                <td>{guest.gender}</td>
                <td>{guest.nationality}</td>
                <td>{guest.identification_no}</td>
                <td>{new Date(guest.expiry_date).toLocaleDateString()}</td>
                <td>{guest.phone_no}</td>
                <td>{guest.email}</td>
                <td>{guest.residential_address}</td>
                <td>{guest.emergency_contact}</td>
                <td>{guest.emergency_phone}</td>
                <td>{guest.emergency_relationship}</td>
                <td>{guest.preferred_room_type}</td>
                <td>{guest.preferred_meal_plan}</td>
                <td>{guest.special_needs}</td>
                <td>{guest.previous_stays}</td>
                <td>{guest.loyalty_program}</td>
                <td>{guest.association}</td>
                <td>{guest.created_at}</td>
                <td><button onClick={() => deleteGuests(guest.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowGuests;