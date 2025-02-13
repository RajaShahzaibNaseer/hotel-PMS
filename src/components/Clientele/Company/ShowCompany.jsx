import { useState, useEffect } from "react";
import "./ShowCompany.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const ShowCompany = () => {

  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();


  const deleteCompany = async id =>{
    try {

      const deleteCompany = await fetch(`http://localhost:5000/company/${id}` , {
        method: "DELETE"
      });

      setCompanies(companies.filter(company => company.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getCompany = async () => {
    try {
      const response = await fetch("http://localhost:5000/company");
      const jsonData = await response.json();

      setCompanies(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getCompany();
  });

  return (
    <div className="companylist-container">
      <nav className="horizontal-navbar">
        <h2>Welcome, Admin</h2>
        <button onClick={() => navigate("/company")}>Add Data</button>
        <button onClick={() => navigate("/clientlist")}>Go Back</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Registration No</th>
              <th>Tax ID No</th>
              <th>Business Type</th>
              <th>Physical Address</th>
              <th>Billing Address</th>
              <th>Office Phone No</th>
              <th>Office Email</th>
              <th>Website</th>
              <th>Full Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.companyname}</td>
                  <td>{company.registrationno}</td>
                  <td>{company.taxidentificationno}</td>
                  <td>{company.businesstype}</td>
                  <td>{company.physicaladdress}</td>
                  <td>{company.billingaddress}</td>
                  <td>{company.officephoneno}</td>
                  <td>{company.officeemail}</td>
                  <td>{company.website}</td>
                  <td>{company.fullname}</td>
                  <td>{company.designation}</td>
                  <td>{company.email}</td>
                  <td>{company.phoneno}</td>
                  <td>{company.created_at}</td>
                  <td><button onClick={() => deleteCompany(company.id)} type="button">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default ShowCompany;