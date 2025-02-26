import { useState, useEffect } from "react";
import "./JobTitles.css";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";

const JobTitles = () => {

  const [department, setDepartment] = useState("");
  const [jobTitles, setjobTitles] = useState([]);
  const [jobTitleName, setjobTitleName] = useState("");
  const [departmentID, setDepartmentID] = useState();
  const[departmentName, setdepartmentName] = useState("");
  const navigate = useNavigate();


  //adding jobTitles
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { jobTitleName, departmentID };
      const response = await fetch("http://localhost:5000/jobTitle", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  //delete jobTitles function
  const deletejobTitle = async id =>{
    try {

      const deletejobTitle = await fetch(`http://localhost:5000/jobTitle/${id}` , {
        method: "DELETE"
      });

      setjobTitles(jobTitles.filter(jobTitle => jobTitle.jobTitleid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getjobTitles = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobTitle");
      const jsonData = await response.json();

      setjobTitles(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getDepartment = async id =>
  {
    const response = await fetch(`http://localhost:5000/departments/${id}`);
    const jsonData = await response.json();
    console.log(jsonData);
    setDepartment(jsonData);
  }


  useEffect(() => {
    getjobTitles();

    const showDepartment = id =>
      {
        getDepartment(id);
        setDepartmentName(department.Departmentname);
        return (
          <p>{departmentName}</p>
        );
      }

  });
  return (
    <DataTableForm
      title="Manage Jobs"
      formFields={[
        {
          type: "text",
          name: "jobTitlename",
          placeholder: "Enter Job Title Name",
          value: jobTitleName,
          onChange: (e) => setjobTitleName(e.target.value),
        },
        {
          type: "text",
          name: "departmentid",
          placeholder: "Enter Department ID",
          value: departmentID,
          onChange: (e) => setDepartmentID(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["jobTitle ID", "job Title Name", "Department Name", "Options"]}
      tableData={jobTitles}
      dataKeys={["jobtitleid", "jobtitlename", "departmentid"]}
      renderActions={(row) => (
        <button onClick={() => deletejobTitle(row.jobtitleid)}>Delete</button>
      )}
    />
  );
};

export default JobTitles;