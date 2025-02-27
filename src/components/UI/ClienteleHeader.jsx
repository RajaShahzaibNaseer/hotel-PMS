import { useNavigate } from "react-router-dom";

const ClienteleHeader = ({ dataUrl, goBack, title }) => {
    const navigate = useNavigate();
  
    return (
      <nav className="flex justify-between items-center bg-gray-800 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="space-x-2">
          <button 
            onClick={() => navigate(`${dataUrl}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
          >
            Add Data
          </button>
          <button 
            onClick={() => navigate(`${goBack}`)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
          >
            Go Back
          </button>
        </div>
      </nav>
    );
};

export default ClienteleHeader;
