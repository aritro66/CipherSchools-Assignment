const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
const authroutes = require("./routes/authroutes");
const userroutes = require("./routes/userroutes");

const PORT = process.env.PORT || 5001;
// url to connect mongodb
const link = `mongodb+srv://${process.env.PASSWORD}:mongodb2002@cluster0.8et7m.mongodb.net/${process.env.DATABASENAME}`;
mongoose
  .connect(`${link}`, { useNewUrlParser: true, useUnifiedTopology: true }) // to avoid warning
  .then(() => {
    console.log("success");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // listen for request
  })
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true, limit: "50mb" })); // parsing form data
app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);
