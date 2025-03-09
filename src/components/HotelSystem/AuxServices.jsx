import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import DataTableForm from "../UI/DataTableForm";
import { API_URL } from "../../config";

const AuxServices = () => {

  const [service, setservice] = useState([]);
  const [servicename, setservicename] = useState("");
  const [serviceprice, setserviceprice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { servicename, serviceprice };
      const response = await fetch(`${API_URL}/aux`, {
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
  const deleteservice = async id =>{
    try {

      const deleteservice = await fetch(`${API_URL}/aux/${id}` , {
        method: "DELETE"
      });

      setservice(service.filter(service => service.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getservice = async () => {
    try {
      const response = await fetch(`${API_URL}/aux`);
      const jsonData = await response.json();

      setservice(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getservice();
  });

  return (
    <DataTableForm
      title="Manage Aux Services"
      formFields={[
        {
          type: "text",
          name: "servicename",
          placeholder: "Enter service Name",
          value: servicename,
          onChange: (e) => setservicename(e.target.value),
        },
        {
          type: "text",
          name: "serviceprice",
          placeholder: "Enter Service Price",
          value: serviceprice,
          onChange: (e) => setserviceprice(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Service ID", "Service Name", "Service Price", "Options"]}
      tableData={service}
      dataKeys={["id", "servicename", "serviceprice"]}
      renderActions={(row) => (
        <button onClick={() => deleteservice(row.id)}
        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition">Delete</button>
      )}
    />
  );
};

export default AuxServices;