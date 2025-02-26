import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";

const AuxServices = () => {

  const [service, setservice] = useState([]);
  const [serviceName, setserviceName] = useState("");
  const [servicePrice, setservicePrice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { serviceName, servicePrice };
      const response = await fetch("http://localhost:5000/services", {
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

      const deleteservice = await fetch(`http://localhost:5000/services/${id}` , {
        method: "DELETE"
      });

      setservice(service.filter(service => service.serviceid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getservice = async () => {
    try {
      const response = await fetch("http://localhost:5000/services");
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
          name: "serviceName",
          placeholder: "Enter Job Title Name",
          value: serviceName,
          onChange: (e) => setserviceName(e.target.value),
        },
        {
          type: "text",
          name: "servicePrice",
          placeholder: "Enter Service Price",
          value: servicePrice,
          onChange: (e) => setservicePrice(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Service ID", "Service Name", "Service Price", "Options"]}
      tableData={service}
      dataKeys={["serviceid", "servicename", "price"]}
      renderActions={(row) => (
        <button onClick={() => deleteservice(row.serviceid)}>Delete</button>
      )}
    />
  );
};

export default AuxServices;