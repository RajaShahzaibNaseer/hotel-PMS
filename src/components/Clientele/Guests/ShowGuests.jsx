import { useState, useEffect } from "react";
import ClienteleHeader from "../../UI/ClienteleHeader";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

const ShowGuests = () => {

  const [guests, setGuests] = useState([]);

  const deleteGuests = async id =>{
    try {

      const deleteGuest = await fetch(`${API_URL}/guests/${id}` , {
        method: "DELETE"
      });

      setGuests(guests.filter(guest => guest.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getGuests = async () => {
    try {
      const response = await fetch(`${API_URL}/guests`);
      const jsonData = await response.json();

      setGuests(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getGuests();
  });

  const tableHeaders = [
    'Guest ID', 'Full Name', 'Date of Birth', 'Gender', 'Nationality', 'ID No', 
    'Expiry Date', 'Phone', 'Email', 'Residential Address', 'Emergency Contact', 
    'Emergency Phone', 'Emergency Relationship', 'Preferred Room Type', 'Preferred Meal Plan', 
    'Special Needs', 'Previous Stays', 'Loyalty Program', 'Association', 'Created At', 'Options'];

  const guestKeys = [
    "id", "fullName", "dateOfBirth", "gender", "nationality", "identificationNo",
    "expiryDate", "phoneNo", "email", "residentialAddress", "emergencyContact", 
    "emergencyPhone", "emergencyRelationship", "preferredRoomType", "preferredMealPlan",
    "specialNeeds", "previousStays", "loyaltyProgram", "association", "created_at"
  ];
            
  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <ClienteleHeader dataUrl="/guests" goBack="/clientlist" title={"Guests"} />
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
            {guests.length > 0 ? (
              guests.map((guest) => (
                <tr key={guest.id}>
                  {guestKeys.map((key, index) => (
                    <td key={index}>
                      {key.includes("date") ? new Date(guest[key]).toLocaleDateString() : guest[key]}
                    </td>
                  ))}
                  <td>
                    <button className="bg-red-500 px-2 py-1 rounded" onClick={() => deleteGuests(guest.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="p-4 text-left text-gray-400">
                  No guests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowGuests;