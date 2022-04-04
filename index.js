require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

// import routes
const authRoute = require("./routes/auth");
const bankRoute = require("./routes/bank");

// express middlewares
app.use(express.json());
app.use(cors());

// route middlewares
app.use("/api/auth", authRoute);
app.use("/api/bank",bankRoute);

// Server
const server = app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server Running on port ${server.address().port}!`);
});
