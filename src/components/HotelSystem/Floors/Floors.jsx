import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";
import { API_URL } from "../../../config";

const Floors = () => {

  const [block, setBlock] = useState();
  const [floors, setFloors] = useState([]);
  const [floorname, setFloorName] = useState("");
  const [blockid, setBlockID] = useState();
  const[blockName, setBlockName] = useState("");
  const navigate = useNavigate();


  //adding Floors
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { floorname, blockid };
      console.log("floorname: ", floorname);
      console.log("blockid: ",blockid);
      const response = await fetch(`${API_URL}/floors`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body),
      });
      console.log(response);

    } catch (error) {
      console.error(error.message);
    }
  }
  
  //delete Floors function
  const deleteFloor = async id =>{
    try {

      const deleteFloor = await fetch(`${API_URL}/floors/${id}` , {
        method: "DELETE"
      });

      setFloors(floors.filter(floor => floor.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getFloors = async () => {
    try {
      const response = await fetch(`${API_URL}/floors`);
      const jsonData = await response.json();

      setFloors(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getBlock = async id =>
  {
    const response = await fetch(`${API_URL}/blocks/${id}`);
    const jsonData = await response.json();
    console.log(jsonData);
    setBlock(jsonData);
  }


  useEffect(() => {
    getFloors();

    // const showBlock = id =>
    //   {
    //     getBlock(id);
    //     setBlockName(block.blockname);
    //     return (
    //       <p>{blockName}</p>
    //     );
    //   }

  });
  return (
    <DataTableForm
      title="Manage Floors"
      formFields={[
        {
          name: "floorName",
          type: "text",
          placeholder: "Enter Floor Name",
          value: floorname,
          onChange: (e) => setFloorName(e.target.value),
        },
        {
          name: "blockID",
          type: "text",
          placeholder: "Enter Block ID",
          value: blockid,
          onChange: (e) => setBlockID(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Floor ID", "Floor Name", "Block ID", "Options"]}
      tableData={floors}
      dataKeys={["id", "floorname", "blockid"]}
      renderActions={(row) => (
        <button
          onClick={() => deleteFloor(row.id)}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
        >
          Delete
        </button>
      )}
    />
  );
};

export default Floors;