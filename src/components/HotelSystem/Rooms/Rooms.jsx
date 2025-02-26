import { useState, useEffect } from "react";
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
    <div className="min-h-screen mx-auto p-6 bg-gray-900 text-white shadow-lg">
      
      <h2 className="text-2xl font-semibold mb-4 text-center">Manage Rooms</h2>
      {/* Form */}
      <form onSubmit={onSubmitForm} className="flex flex-wrap gap-3 mb-6">
        <input 
          type="text" 
          name="roomNumber" 
          placeholder="Enter Room Number"
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md 
          text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={roomNumber} 
          onChange={e => setRoomNumber(e.target.value)} 
        />
        <input 
          type="text" 
          name="floorID"
          placeholder="Enter Floor ID"
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md 
          text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={floorID} 
          onChange={e => setFloorID(e.target.value)} 
        />
        <input 
          type="text" 
          name="roomTypeID"
          placeholder="Enter Room type ID"
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md 
          text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={roomTypeID} 
          onChange={e => setRoomTypeID(e.target.value)} 
        />
        <button 
          type="submit"
          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
        >
          Add
        </button>
      </form>
      {/* Rooms Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 text-center">
          <thead className="text-sm sm:text-base">
            <tr className="bg-gray-800 text-gray-300">
              <th className="border border-gray-700 p-3">Room ID</th>
              <th className="border border-gray-700 p-3">Room Number</th>
              <th className="border border-gray-700 p-3">Floor ID</th>
              <th className="border border-gray-700 p-3">Room Type</th>
              <th className="border border-gray-700 p-3">Room Status</th>
              <th className="border border-gray-700 p-3">Options</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            {rooms.length > 0 ? (
              rooms.map(room => (
                <tr key={room.roomid} className="bg-gray-900 hover:bg-gray-800 transition">
                  <td className="border border-gray-700 p-3">{room.roomid}</td>
                  <td className="border border-gray-700 p-3">{room.roomnumber}</td>
                  <td className="border border-gray-700 p-3">{room.floorid}</td>
                  <td className="border border-gray-700 p-3">{room.roomtypeid}</td>
                  <td className="border border-gray-700 p-3">{room.status}</td>
                  <td>
                    <button 
                      onClick={() => deleteRoom(room.roomid)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                    >
                      Delete
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-400">
                  No rooms found.
                </td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rooms;