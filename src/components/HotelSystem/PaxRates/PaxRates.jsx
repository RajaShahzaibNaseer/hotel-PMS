import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";
import { API_URL } from "../../../config";

const PaxRates = () => {

  const [paxRates, setpaxRates] = useState([]);
  const [paxratename, setpaxratename] = useState("");
  const [paxrateprice, setpaxrateprice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { paxratename, paxrateprice };
      const response = await fetch(`${API_URL}/paxrates`, {
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
  const deletepaxRate = async id =>{
    try {

      const deletepaxRate = await fetch(`${API_URL}/paxrates/${id}` , {
        method: "DELETE"
      });

      setpaxRates(paxRates.filter(paxRate => paxRate.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getpaxRates = async () => {
    try {
      const response = await fetch(`${API_URL}/paxrates`);
      const jsonData = await response.json();

      setpaxRates(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getpaxRates();
  });

  return (
    <DataTableForm
      title="Manage Pax Rates"
      formFields={[
        {
          type: "text",
          name: "paxratename",
          placeholder: "Enter Pax Rate Name",
          value: paxratename,
          onChange: (e) => setpaxratename(e.target.value),
        },
        {
          type: "text",
          name: "paxrateprice",
          placeholder: "Enter Pax Rate Price",
          value: paxrateprice,
          onChange: (e) => setpaxrateprice(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Pax Rate ID", "Pax Rate Name", "Pax Rate Price", "Options"]}
      tableData={paxRates}
      dataKeys={["id", "paxratename", "paxrateprice"]}
      renderActions={(row) => (
        <button onClick={() => deletepaxRate(row.id)}
        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition">Delete</button>
      )}
    />
  );
};

export default PaxRates;