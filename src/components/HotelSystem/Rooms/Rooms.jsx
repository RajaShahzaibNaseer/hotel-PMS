import { useState, useEffect } from "react";
import "./Rooms.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const Rooms = () => {

  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [floorID, setFloorID] = useState();
  const [roomTypeID,setRoomTypeID] = useState();
  const [roomStatus,setRoomStatus] = useState("Vacant Ready");
  const [roomPrice, setRoomPrice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const body = { roomNumber, floorID, roomTypeID, roomStatus, roomPrice };
        const response = await fetch("http://localhost:5000/rooms", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body),
        });
        console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  //delete rooms function
  const deleteRoom = async id =>{
    try {

      const deleteRooms = await fetch(`http://localhost:5000/rooms/${id}` , {
        method: "DELETE"
      });

      setRooms(rooms.filter(room => room.roomid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getRooms = async () => {
    try {
      const response = await fetch("http://localhost:5000/rooms");
      const jsonData = await response.json();

      setRooms(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getRooms();
  });

  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="roomNumber" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} />
          <input type="text" name="floorID" value={floorID} onChange={e => setFloorID(e.target.value)} />
          <input type="text" name="roomTypeID" value={roomTypeID} onChange={e => setRoomTypeID(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
        <button onClick={() => navigate("/floors")}>Floors</button>
        <button onClick={() => navigate("/conferenceRooms")}>Conference Rooms</button>
        <button onClick={() => navigate("/departments")}>Departments</button>
        <button onClick={() => navigate("/jobs")}>Jobs</button>
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
        <button onClick={() => navigate("/admin")}>Blocks</button>
        <button onClick={() => navigate("/mealplanrates")}>meal plan rates</button>
        <button onClick={() => navigate("/guests")}>guests</button>
        <button onClick={() => navigate("/roomtypes")}>Room Types</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Room Number</th>
              <th>Floor ID</th>
              <th>Room Type</th>
              <th>Room Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.roomid}>
                <td>{room.roomid}</td>
                <td>{room.roomnumber}</td>
                <td>{room.floorid}</td>
                <td>{room.roomtypeid}</td>
                <td>{room.status}</td>
                <td><button onClick={() => deleteRoom(room.roomid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rooms;