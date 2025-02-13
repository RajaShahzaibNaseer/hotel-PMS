import { useState, useEffect } from "react";
import "./Floors.css";
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
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="Floorname" value={floorName} onChange={e => SetFloorName(e.target.value)} />
          <input type="text" name="blockid" value={blockID} onChange={e => setBlockID(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
          <button onClick={() => navigate("/admin")}>BLocks</button>
          <button onClick={() => navigate("/rooms")}>Rooms</button>
          <button onClick={() => navigate("/roomtypes")}>Room Types</button>
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
              <th>FloorID</th>
              <th>Floor Name</th>
              <th>Block Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {floors.map(floor => (
              <tr key={floor.floorid}>
                <td>{floor.floorid}</td>
                <td>{floor.floorname}</td>
                <td>{floor.blockid}</td>
                <td><button onClick={() => deleteFloor(floor.floorid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Floors;