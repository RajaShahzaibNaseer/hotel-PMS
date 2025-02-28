import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";

const Departments = () => {

  const [departments, setDepartments] = useState([]);
  const [departmentname, setDepartmentName] = useState("")
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { departmentname };
      const response = await fetch("http://localhost:5000/departments", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  //delete blocks function
  const deleteDepartment = async id =>{
    try {

      const deleteDepartment = await fetch(`http://localhost:5000/departments/${id}` , {
        method: "DELETE"
      });

      setDepartments(departments.filter(department => department.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getDepartments = async () => {
    try {
      const response = await await fetch("http://localhost:5000/departments");
      const jsonData = await response.json();

      setDepartments(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDepartments();
  });

  return (
    <DataTableForm
      title="Manage Departments"
      formFields={[
        {
          type: "text",
          name: "departmentname",
          placeholder: "Enter Department Name",
          value: departmentname,
          onChange: (e) => setDepartmentName(e.target.value),
        },
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Department ID", "Department Name", "Options"]}
      tableData={departments}
      dataKeys={["id", "departmentname"]}
      renderActions={(department) => (
        <button onClick={() => deleteDepartment(department.id)}
        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition">Delete</button>
      )}
    />
  );
};

export default Departments;