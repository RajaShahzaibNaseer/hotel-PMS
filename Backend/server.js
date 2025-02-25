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
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Use all dynamically loaded routes
app.use("/blocks", blockRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

