import { useState, useEffect } from "react";
import "./ShowGroups.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import ClienteleHeader from "../../UI/ClienteleHeader";

const ShowGroups = () => {

  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();


  const deleteGroups = async id =>{
    try {
      const deleteGroups = await fetch(`http://localhost:5000/groups/${id}` , {
        method: "DELETE"
      });

      setGroups(groups.filter(group => group.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getGroups = async () => {
    try {
      const response = await fetch("http://localhost:5000/groups");
      const jsonData = await response.json();

      setGroups(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getGroups();
  });

  const tableHeaders = [
    "ID", "Group Name", "Associated With", "Full Name", "Email", "Phone", "Created At", "Options"
  ]

  const groupKeys = [
    "id", "groupname", "associatedwith", "fullname", "email", "phoneno", "created_at"
  ]

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <ClienteleHeader dataUrl={'/groups'} goBack={'/clientlist'} />
      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse border border-gray-700 text-sm text-center">
          <thead className="bg-gray-800 text-gray-300 text-xs sm:text-sm">
            <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index} className="border border-gray-700 p-2">{header}</th>
                ))}
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm">
          {groups.length > 0 ? (
            groups.map((group) => (
              <tr key={group.id}>
                {groupKeys.map((key) => (
                  <td key={key}>{group[key]}</td>
                ))}
                <td>
                  <button onClick={() => deleteGroups(group.id)} type="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={groupKeys.length + 1} className="p-4 text-gray-400">
                No groups found.
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowGroups;