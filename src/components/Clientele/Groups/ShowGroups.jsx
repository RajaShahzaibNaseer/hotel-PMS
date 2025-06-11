import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import ClienteleHeader from "../../UI/ClienteleHeader";
import { API_URL } from "../../../config";

const ShowGroups = () => {

  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();


  const deleteGroups = async id =>{
    try {
      const deleteGroups = await fetch(`${API_URL}/groups/${id}` , {
        method: "DELETE"
      });

      setGroups(groups.filter(group => group.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getGroups = async () => {
    try {
      const response = await fetch(`${API_URL}/groups`);
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
    "id", "groupName", "associatedWith", "fullName", "email", "phoneNo", "created_at"
  ]

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <ClienteleHeader dataUrl={'/groups'} goBack={'/clientlist'} title={"Groups"} />
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
              <td colSpan={groupKeys.length + 1} className="p-4 text-left text-gray-400">
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