const express = require("express");
const cors = require("cors")
const blockRoute = require("./Routes/BlockRoutes");
const floorRoute = require("./Routes/FloorRoutes");
const roomRoute = require("./Routes/RoomRoutes");
const roomTypeRoute = require("./Routes/RoomTypeRoutes");
const conferenceRoomRoute = require("./Routes/ConferenceRoomRoutes");
const departmentRoute = require("./Routes/DepartmentRoutes");
const jobRoute = require("./Routes/JobTitleRoutes");
const auxRoute = require("./Routes/AuxRoutes");
const mealPlanRoute = require("./Routes/MealPlanRoutes");
const paxRateRoute = require("./Routes/PaxRateRoutes");
const guestRoute = require("./Routes/GuestRoutes");
const companyRoute = require("./Routes/CompanyRoutes");
const agentRoute = require("./Routes/AgentRoutes");
const groupRoute = require("./Routes/GroupRoutes");
const stockRoute = require("./Routes/StocksRoutes")
const categoryRoute = require("./Routes/CategoryRoutes")
const itemRoute = require("./Routes/ItemsRoutes");
const foodSymbolRoute = require("./Routes/FoodSymbolRoutes");
const foodModifierRoute = require("./Routes/ItemModifierRoutes");
const finishedGoodsRoute = require("./Routes/FinishedGoodsRoutes");
const supplierRoute = require("./Routes/SuppliersRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/blocks", blockRoute);
app.use("/floors", floorRoute);
app.use("/rooms", roomRoute);
app.use("/roomtypes", roomTypeRoute);
app.use("/conferencerooms", conferenceRoomRoute);
app.use("/departments", departmentRoute);
app.use("/jobs", jobRoute);
app.use("/aux", auxRoute);
app.use("/mealplans", mealPlanRoute);
app.use("/paxrates", paxRateRoute);
app.use("/guests", guestRoute);
app.use("/company", companyRoute);
app.use("/agents", agentRoute);
app.use("/groups", groupRoute);
app.use("/stocks", stockRoute);
app.use("/categories", categoryRoute);
app.use("/items",itemRoute);
app.use("/food-symbols",foodSymbolRoute);
app.use("/modifiers",foodModifierRoute);
app.use("/finished-goods",finishedGoodsRoute);
app.use("/suppliers",supplierRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

