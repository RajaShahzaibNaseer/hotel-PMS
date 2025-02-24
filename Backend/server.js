const express = require("express");
const blockRoute = require("./Routes/BlockRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// Use all dynamically loaded routes
app.use("/blocks", blockRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

