import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";

const PaxRates = () => {

  const [paxRates, setpaxRates] = useState([]);
  const [paxRateName, setpaxRateName] = useState("");
  const [paxRatePrice, setpaxRatePrice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { paxRateName, paxRatePrice };
      const response = await fetch("http://localhost:5000/paxrates", {
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

      const deletepaxRate = await fetch(`http://localhost:5000/paxrates/${id}` , {
        method: "DELETE"
      });

      setpaxRates(paxRates.filter(paxRate => paxRate.paxRaterateid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getpaxRates = async () => {
    try {
      const response = await fetch("http://localhost:5000/paxrates");
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
          name: "paxRateName",
          placeholder: "Enter Pax Rate Name",
          value: paxRateName,
          onChange: (e) => setpaxRateName(e.target.value),
        },
        {
          type: "text",
          name: "paxRatePrice",
          placeholder: "Enter Pax Rate Price",
          value: paxRatePrice,
          onChange: (e) => setpaxRatePrice(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Pax Rate ID", "Pax Rate Name", "Pax Rate Price", "Options"]}
      tableData={paxRates}
      dataKeys={["paxrateid", "paxratename", "price"]}
      renderActions={(row) => (
        <button onClick={() => deletepaxRate(row.paxrateid)}>Delete</button>
      )}
    />
  );
};

export default PaxRates;