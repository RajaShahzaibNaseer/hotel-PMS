import { useState, useEffect } from "react";
import "./MealPlans.css";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const MealPlans = () => {

  const [mealPlans, setMealPlans] = useState([]);
  const [mealPlanName, setMealPlanName] = useState("");
  const [mealPlanPrice, setMealPlanPrice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { mealPlanName, mealPlanPrice };
      const response = await fetch("http://localhost:5000/mealplanrates", {
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
  const deleteMealPlan = async id =>{
    try {

      const deleteMealPlan = await fetch(`http://localhost:5000/mealplanrates/${id}` , {
        method: "DELETE"
      });

      setMealPlans(mealPlans.filter(mealPlan => mealPlan.mealplanrateid !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getMealPlans = async () => {
    try {
      const response = await fetch("http://localhost:5000/mealplanrates");
      const jsonData = await response.json();

      setMealPlans(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getMealPlans();
  });

  return (
    <div className="admin-container">
      <nav className="vertical-navbar">
        <h2>Welcome, Admin</h2>
        <form onSubmit={onSubmitForm}>
          <input type="text" name="mealPlanName" value={mealPlanName} onChange={e => setMealPlanName(e.target.value)} />
          <input type="text" name="mealPlanPrice" value={mealPlanPrice} onChange={e => setMealPlanPrice(e.target.value)} />
          <button type="submit">Add Data</button>
        </form>
        <button onClick={() => navigate("/floors")}>Floors</button>
        <button onClick={() => navigate("/conferenceRooms")}>Conference Rooms</button>
        <button onClick={() => navigate("/departments")}>Departments</button>
        <button onClick={() => navigate("/jobs")}>Jobs</button>
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
        <button onClick={() => navigate("/admin")}>Blocks</button>
        <button onClick={() => navigate("/guests")}>guests</button>
        <button onClick={() => navigate("/rooms")}>Rooms</button>
        <button onClick={() => navigate("/roomtypes")}>Room Types</button>
      </nav>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Meal Plan ID</th>
              <th>Meal Plan Name</th>
              <th>Meal Plan Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {mealPlans.map(mealPlan => (
              <tr key={mealPlan.mealplanrateid}>
                <td>{mealPlan.mealplanrateid}</td>
                <td>{mealPlan.mealplanname}</td>
                <td>{mealPlan.price}</td>
                <td><button onClick={() => deleteMealPlan(mealPlan.mealplanrateid)}>Delete</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealPlans;