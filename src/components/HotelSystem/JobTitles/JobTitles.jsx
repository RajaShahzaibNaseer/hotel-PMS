import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";
import { API_URL } from "../../../config";

const JobTitles = () => {

  const [department, setDepartment] = useState("");
  const [jobTitles, setjobTitles] = useState([]);
  const [jobtitlename, setjobtitlename] = useState("");
  const [departmentid, setdepartmentid] = useState();
  const[departmentname, setdepartmentname] = useState("");
  const navigate = useNavigate();


  //adding jobTitles
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { jobtitlename, departmentid };
      const response = await fetch(`${API_URL}/jobs`, {
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

      const deletejobTitle = await fetch(`${API_URL}/jobs/${id}` , {
        method: "DELETE"
      });

      setjobTitles(jobTitles.filter(jobTitle => jobTitle.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getjobTitles = async () => {
    try {
      const response = await fetch(`${API_URL}/jobs`);
      const jsonData = await response.json();

      setjobTitles(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getDepartment = async id =>
  {
    const response = await fetch(`${API_URL}/departments/${id}`);
    const jsonData = await response.json();
    console.log(jsonData);
    setDepartment(jsonData);
  }


  useEffect(() => {
    getjobTitles();

    const showDepartment = id =>
      {
        getDepartment(id);
        setdepartmentname(department.departmentname);
        return (
          <p>{departmentname}</p>
        );
      }

  });
  return (
    <DataTableForm
      title="Manage Jobs"
      formFields={[
        {
          type: "text",
          name: "jobtitlename",
          placeholder: "Enter Job Title Name",
          value: jobtitlename,
          onChange: (e) => setjobtitlename(e.target.value),
        },
        {
          type: "text",
          name: "departmentid",
          placeholder: "Enter Department ID",
          value: departmentid,
          onChange: (e) => setdepartmentid(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["jobTitle ID", "job Title Name", "Department Name", "Options"]}
      tableData={jobTitles}
      dataKeys={["id", "jobtitlename", "departmentid"]}
      renderActions={(row) => (
        <button onClick={() => deletejobTitle(row.id)}
        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition">Delete</button>
      )}
    />
  );
};

export default JobTitles;