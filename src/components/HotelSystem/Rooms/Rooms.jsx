import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";

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
    <DataTableForm
      title="Manage Rooms"
      formFields={[
        {
          name: "roomNumber",
          type: "text",
          placeholder: "Enter Room Number",
          value: roomNumber,
          onChange: (e) => setRoomNumber(e.target.value),
        },
        {
          name: "floorID",
          type: "text",
          placeholder: "Enter Floor ID",
          value: floorID,
          onChange: (e) => setFloorID(e.target.value),
        },
        {
          name: "roomTypeID",
          type: "text",
          placeholder: "Enter Room type ID",
          value: roomTypeID,
          onChange: (e) => setRoomTypeID(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Room ID", "Room Number", "Floor ID", "Room Type", 
                      "Room Status", "Options"]}
      tableData={rooms}
      dataKeys={["roomid", "roomnumber", "floorid", "roomtypeid", "status"]}
      renderActions={(row) => (
        <button
          onClick={() => deleteRoom(row.roomid)}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
        >
          Delete
        </button>
      )}
    />
  );
};

export default Rooms;