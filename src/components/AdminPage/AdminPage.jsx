import { useState, useEffect } from "react";
import "./AdminPage.css";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AdminPage = () => {

  const [blocks, setBlocks] = useState([]);
  const [blockname, SetBlockName] = useState("")
  const navigate = useNavigate();


  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { blockname };
      const response = await fetch("http://localhost:5000/blocks", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  //delete blocks function
  const deleteBlock = async id =>{
    try {
      const deleteBlock = await fetch(`http://localhost:5000/blocks/${id}` , {
        method: "DELETE"
      });

      setBlocks(blocks.filter(block => block.blockid !== id));
    } catch (error) {

      console.error(error.message);
    }
  }

  const getBlocks = async () => {
    try {
      const response = await await fetch("http://localhost:5000/blocks");
      const jsonData = await response.json();

      setBlocks(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getBlocks();
  });

  const routes = [
    { title: "Floors", url: "/floors" },
    { title: "Rooms", url: "/rooms" },
    { title: "Room Types", url: "/roomtypes" },
    { title: "Conference Rooms", url: "/conferenceRooms" },
    { title: "Departments", url: "/departments" },
    { title: "Jobs", url: "/jobs" },
    { title: "Auxiliary Services", url: "/services" },
    { title: "Meal Plan Rates", url: "/mealplanrates" },
    { title: "Pax Rates", url: "/paxrates" },
    { title: "Go Back", url: "/navigator" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="w-64 p-5 flex flex-col items-center border-r border-gray-700 bg-gray-900 shadow-lg">
        <h2 className="mb-5 text-xl font-semibold">Welcome, Admin</h2>
        
        <hr className="border-gray-700 w-full my-4" />
        
        {/* Navigation Buttons */}
        <div>
          {routes.map(({ title, url }) => (
            <button
              key={url}
              onClick={() => navigate(url)}
              className="w-full mt-2 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-medium transition"
            >
              {title}
            </button>
          ))}
        </div>
      </nav>

      {/* Blocks Table */}
      <div className="flex-grow p-5 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Blocks List</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-center">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="border border-gray-700 p-3">Block ID</th>
                <th className="border border-gray-700 p-3">Block Name</th>
                <th className="border border-gray-700 p-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block) => (
                <tr key={block.blockid} className="bg-gray-900 hover:bg-gray-800 transition">
                  <td className="border border-gray-700 p-3">{block.blockid}</td>
                  <td className="border border-gray-700 p-3">{block.blockname}</td>
                  <td className="border border-gray-700 p-3">
                    <button
                      onClick={() => deleteBlock(block.blockid)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;