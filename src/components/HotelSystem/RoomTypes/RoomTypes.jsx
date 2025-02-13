import { useState, useEffect } from "react";
import "./RoomTypes.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const RoomTypes = () => {

  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypeName, setRoomTypeName] = useState("");
  const [roomTypePrice, setRoomTypePrice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { roomTypeName, roomTypePrice };
      const response = await fetch("http://localhost:5000/roomtypes", {
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
  const deleteRoomType = async id =>{
    try {

      const deleteRoomType = await fetch(`http://localhost:5000/roomtypes/${id}` , {
        method: "DELETE"
      });

      setRoomTypes(roomTypes.filter(roomType => roomType.roomtypeid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getRoomTypes = async () => {
    try {
      const response = await fetch("http://localhost:5000/roomtypes");
      const jsonData = await response.json();

      setRoomTypes(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getRoomTypes();
  });

  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="roomTypeName" value={roomTypeName} onChange={e => setRoomTypeName(e.target.value)} />
          <input type="text" name="roomTypePrice" value={roomTypePrice} onChange={e => setRoomTypePrice(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
        <button onClick={() => navigate("/admin")}>Blocks</button>
        <button onClick={() => navigate("/floors")}>Floors</button>
        <button onClick={() => navigate("/rooms")}>Rooms</button>
        <button onClick={() => navigate("/conferenceRooms")}>Conference Rooms</button>
        <button onClick={() => navigate("/departments")}>Departments</button>
        <button onClick={() => navigate("/jobs")}>jobs</button>
        <button onClick={() => navigate("/services")}>Auxilary Services</button>
        <button onClick={() => navigate("/mealplanrates")}>Meal Plans</button>
        <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
        <button onClick={() => navigate("/navigator")}>Go Back</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Room Type ID</th>
              <th>Room Type Name</th>
              <th>Room Type Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map(roomType => (
              <tr key={roomType.roomtypeid}>
                <td>{roomType.roomtypeid}</td>
                <td>{roomType.roomtypename}</td>
                <td>{roomType.price}</td>
                <td><button onClick={() => deleteRoomType(roomType.roomtypeid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomTypes;