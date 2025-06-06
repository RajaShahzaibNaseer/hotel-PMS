import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import DataTableForm from "../UI/DataTableForm";
import { API_URL } from "../../config";

const Rooms = () => {

  const [rooms, setRooms] = useState([]);
  const [roomnumber, setroomnumber] = useState("");
  const [floorid, setfloorid] = useState();
  const [roomtypeid,setroomtypeid] = useState();
  const [roomstatus,setroomstatus] = useState("Vacant Ready");
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const body = { roomnumber, floorid, roomtypeid, roomstatus };
        const response = await fetch(`${API_URL}/rooms`, {
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

      const deleteRooms = await fetch(`${API_URL}/rooms/${id}` , {
        method: "DELETE"
      });

      setRooms(rooms.filter(room => room.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getRooms = async () => {
    try {
      const response = await fetch(`${API_URL}/rooms`);
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
          name: "roomnumber",
          type: "text",
          placeholder: "Enter Room Number",
          value: roomnumber,
          onChange: (e) => setroomnumber(e.target.value),
        },
        {
          name: "floorid",
          type: "text",
          placeholder: "Enter Floor ID",
          value: floorid,
          onChange: (e) => setfloorid(e.target.value),
        },
        {
          name: "roomtypeid",
          type: "text",
          placeholder: "Enter Room type ID",
          value: roomtypeid,
          onChange: (e) => setroomtypeid(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Room ID", "Room Number", "Floor ID", "Room Type", 
                      "Room Status", "Options"]}
      tableData={rooms}
      dataKeys={["id", "roomnumber", "floorid", "roomtypeid", "roomstatus"]}
      renderActions={(row) => (
        <button
          onClick={() => deleteRoom(row.id)}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
        >
          Delete
        </button>
      )}
    />
  );
};

export default Rooms;