import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";

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
    <DataTableForm
        title="Manage Departments"
        formFields={[
          {
            type: "text",
            name: "mealPlanName",
            placeholder: "Enter Meal Plan Name",
            value: mealPlanName,
            onChange: (e) => setMealPlanName(e.target.value),
          },
          {
            type: "number",
            name: "mealPlanPrice",
            placeholder: "Enter Meal Price",
            value: mealPlanPrice,
            onChange: (e) => setMealPlanPrice(e.target.value),
          },
        ]}
        onFormSubmit={onSubmitForm}
        tableHeaders={["Meal Plan ID", "Meal Plan Name", "Meal Plan Price", "Options"]}
        tableData={mealPlans}
        dataKeys={["mealplanrateid", "mealplanname", "price"]}
        renderActions={(row) => (
          <button onClick={() => deleteMealPlan(row.mealplanrateid)}>Delete</button>
        )}
    />
  );
};

export default MealPlans;