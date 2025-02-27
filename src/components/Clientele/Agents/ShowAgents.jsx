import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import ClienteleHeader from "../../UI/ClienteleHeader";

const ShowAgents = () => {

  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();


  const deleteAgent = async id =>{
    try {

      const deleteAgent = await fetch(`http://localhost:5000/agents/${id}` , {
        method: "DELETE"
      });

      setAgents(agents.filter(agent => agent.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getAgent = async () => {
    try {
      const response = await fetch("http://localhost:5000/agents");
      const jsonData = await response.json();

      setAgents(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getAgent();
  });

  const tableHeaders = [
    "ID", "Agency Name", "Agent Full Name", "Registration No", "Tax ID No", "Physical Address",
    "Agency Email", "Agency Phone No", "Website", "Full Name", "Designation", "Email", "Phone No",
    "Created At", "Options"
  ]

  const agentKeys = [
    "id", "agencyname", "agentfullname", "registrationno", "taxidentificationno", "physicaladdress",
    "agencyemail", "agencyphoneno", "website", "fullname", "designation", "email", "phoneno",
    "created_at"
  ]

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <ClienteleHeader dataUrl={"/agents"} goBack={"/clientlist"} title={"Agents"} />
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
              {agents.length > 0 ? (
                agents.map((agent) => (
                <tr key={agent.id}>
                  {agentKeys.map((key) => (
                    <td key={key}>{agent[key]}</td>
                  ))}
                  <td><button onClick={() => deleteAgent(agent.id)}>Delete</button></td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan={agentKeys.length + 1} className="p-4 text-left text-gray-400">
                    No agents found.
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

export default ShowAgents;