import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import ClienteleHeader from "../../UI/ClienteleHeader";
import { API_URL } from "../../../config";

const ShowCompany = () => {

  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();


  const deleteCompany = async id =>{
    try {

      const deleteCompany = await fetch(`${API_URL}/company/${id}` , {
        method: "DELETE"
      });

      setCompanies(companies.filter(company => company.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getCompany = async () => {
    try {
      const response = await fetch(`${API_URL}/company`);
      const jsonData = await response.json();

      setCompanies(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getCompany();
  });

  const tableHeaders = [
    "ID", "Company Name", "Registration No", "Tax ID No", "Business Type", "Physical Address",
    "Billing Address", "Office Phone No", "Office Email", "Website", "Full Name", "Designation",
    "Email", "Phone No", "Created At", "Options",
  ];

  const companyKeys = [
    "id", "companyname", "registrationno", "taxidentificationno", "businesstype", "physicaladdress",
    "billingaddress", "officephoneno", "officeemail", "website", "fullname", "designation",
    "email", "phoneno", "created_at",
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <ClienteleHeader dataUrl="/company" goBack="/clientlist" title={"Companies"} />
      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse border border-gray-700 text-sm text-center">
          {/* Table Header */}
          <thead className="bg-gray-800 text-gray-300 text-xs sm:text-sm">
            <tr>
              {tableHeaders.map((header, index) => (
                  <th key={index} className="border border-gray-700 p-2">{header}</th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-xs sm:text-sm">
            {companies.length > 0 ? (
              companies.map((company) => (
                <tr key={company.id}>
                  {companyKeys.map((key) => (
                    <td key={key}>{company[key]}</td>
                  ))}
                  <td>
                    <button onClick={() => deleteCompany(company.id)} type="button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={companyKeys.length + 1} className="p-4 text-left text-gray-400">
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowCompany;