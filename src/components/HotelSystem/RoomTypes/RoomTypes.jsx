import { useState, useEffect } from "react";
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
    <div className="min-h-screen mx-auto p-6 bg-gray-900 text-white shadow-lg">
      
      <h2 className="text-2xl font-semibold mb-4 text-center">Manage Room Types</h2>
      {/* Forms */}
      <form onSubmit={onSubmitForm} className="flex flex-wrap gap-3 mb-6">
        <input 
          type="text" 
          name="roomTypeName" 
          placeholder="Room Type Name"
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md 
          text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={roomTypeName} 
          onChange={e => setRoomTypeName(e.target.value)} 
        />
        <input 
          type="text" 
          name="roomTypePrice" 
          placeholder="Room Type Price"
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md 
          text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={roomTypePrice} 
          onChange={e => setRoomTypePrice(e.target.value)} 
        />
        <button 
          type="submit"
          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
        >
          Add Data
        </button>
      </form>
      {/* Room types Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 text-center">
          <thead className="text-sm sm:text-base">
            <tr className="bg-gray-800 text-gray-300">
              <th className="border border-gray-700 p-3">Room Type ID</th>
              <th className="border border-gray-700 p-3">Room Type Name</th>
              <th className="border border-gray-700 p-3">Room Type Price</th>
              <th className="border border-gray-700 p-3">Options</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            {roomTypes.length > 0 ? (
              roomTypes.map(roomType => (
                <tr key={roomType.roomtypeid}>
                  <td>{roomType.roomtypeid}</td>
                  <td>{roomType.roomtypename}</td>
                  <td>{roomType.price}</td>
                  <td>
                    <button 
                      onClick={() => deleteRoomType(roomType.roomtypeid)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-gray-400">
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

export default RoomTypes;