import { useState, useEffect } from "react";
import DataTableForm from '../../UI/DataTableForm'
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const RoomTypes = () => {

  const [roomTypes, setRoomTypes] = useState([]);
  const [roomtypename, setroomtypename] = useState("");
  const [roomtypeprice, setroomtypeprice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { roomtypename, roomtypeprice };
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
    <DataTableForm
      title="Manage Room Types"
      formFields={[
        {
          name: "roomtypename",
          type: "text",
          placeholder: "Room Type Name",
          value: roomtypename,
          onChange: (e) => setroomtypename(e.target.value),
        },
        {
          name: "roomtypeprice",
          type: "text",
          placeholder: "Room Type Price",
          value: roomtypeprice,
          onChange: (e) => setroomtypeprice(e.target.value),
        }
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Room Type ID", "Room Type Name", "Room Type Price", "Options"]}
      tableData={roomTypes}
      dataKeys={["id", "roomtypename", "roomtypeprice"]}
      renderActions={(row) => (
        <button
          onClick={() => deleteRoomType(row.id)}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
        >
          Delete
        </button>
      )}
    />
  ); 
};

export default RoomTypes;