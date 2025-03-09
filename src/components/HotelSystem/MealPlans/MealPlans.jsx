import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";
import { API_URL } from "../../../config";

const MealPlans = () => {

  const [mealPlans, setMealPlans] = useState([]);
  const [mealplanname, setmealplanname] = useState("");
  const [mealplanprice, setmealplanprice] = useState();
  const navigate = useNavigate();

  //adding blocks
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { mealplanname, mealplanprice };
      const response = await fetch(`${API_URL}/mealplans`, {
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

      const deleteMealPlan = await fetch(`${API_URL}/mealplans/${id}` , {
        method: "DELETE"
      });

      setMealPlans(mealPlans.filter(mealPlan => mealPlan.id !== id));

    } catch (error) {
      console.error(error.message);
    }
  }

  const getMealPlans = async () => {
    try {
      const response = await fetch(`${API_URL}/mealplans`);
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
    <DataTableForm
        title="Manage Departments"
        formFields={[
          {
            type: "text",
            name: "mealplanname",
            placeholder: "Enter Meal Plan Name",
            value: mealplanname,
            onChange: (e) => setmealplanname(e.target.value),
          },
          {
            type: "number",
            name: "mealplanprice",
            placeholder: "Enter Meal Price",
            value: mealplanprice,
            onChange: (e) => setmealplanprice(e.target.value),
          },
        ]}
        onFormSubmit={onSubmitForm}
        tableHeaders={["Meal Plan ID", "Meal Plan Name", "Meal Plan Price", "Options"]}
        tableData={mealPlans}
        dataKeys={["id", "mealplanname", "mealplanprice"]}
        renderActions={(row) => (
          <button onClick={() => deleteMealPlan(row.id)}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition">Delete</button>
        )}
    />
  );
};

export default MealPlans;