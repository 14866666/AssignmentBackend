const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Allow requests from the frontend
const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = require("./models/db.js");

// Routes
require("./routes/product.routes.js")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
