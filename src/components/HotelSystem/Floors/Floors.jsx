import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Floors = () => {

  const [block, setBlock] = useState("");
  const [floors, setFloors] = useState([]);
  const [floorName, SetFloorName] = useState("");
  const [blockID, setBlockID] = useState();
  const[blockName, setBlockName] = useState("");
  const navigate = useNavigate();


  //adding Floors
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { floorName, blockID };
      const response = await fetch("http://localhost:5000/floors", {
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

      const deleteFloor = await fetch(`http://localhost:5000/floors/${id}` , {
        method: "DELETE"
      });

      setFloors(floors.filter(floor => floor.floorid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getFloors = async () => {
    try {
      const response = await fetch("http://localhost:5000/floors");
      const jsonData = await response.json();

      setFloors(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getBlock = async id =>
  {
    const response = await fetch(`http://localhost:5000/blocks/${id}`);
    const jsonData = await response.json();
    console.log(jsonData);
    setBlock(jsonData);
  }


  useEffect(() => {
    getFloors();

    const showBlock = id =>
      {
        getBlock(id);
        setBlockName(block.blockname);
        return (
          <p>{blockName}</p>
        );
      }

  });
  return (
    <div className="min-h-screen mx-auto p-6 bg-gray-900 text-white shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Manage Floors</h2>

      <form onSubmit={onSubmitForm} className="flex gap-3 mb-6">
        <input 
          type="text" 
          name="Floorname"
          placeholder="Enter Floor Name"
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white 
            outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={floorName} 
          onChange={e => SetFloorName(e.target.value)} 
        />
        <input 
          type="text" 
          name="blockid" 
          placeholder="Enter Floor ID"
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white 
            outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={blockID} 
          onChange={e => setBlockID(e.target.value)} 
        />
        <button 
          type="submit"
          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
        >
          Add Data
        </button>
      </form>
      {/* Floors Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 text-center">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="border border-gray-700 p-3">Floor ID</th>
              <th className="border border-gray-700 p-3">Floor Name</th>
              <th className="border border-gray-700 p-3">Block Name</th>
              <th className="border border-gray-700 p-3">Options</th>
            </tr>
          </thead>
          <tbody>
            {floors.length > 0 ? (
              floors.map(floor => (
                <tr key={floor.floorid}>
                  <td>{floor.floorid}</td>
                  <td>{floor.floorname}</td>
                  <td>{floor.blockid}</td>
                  <td><button onClick={() => deleteFloor(floor.floorid)}>Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-gray-400">
                  No floors found.
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

export default Floors;