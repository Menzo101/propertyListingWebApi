const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// routing calling;

const userAuth = require("./routers/userrouter.js");
const propertyEndpoint = require("./routers/propertyrouter.js");

// middleWares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieparser());

// database connection
const dataConnection = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("database connected successfuly");
  } catch (error) {
    console.log("error " + error);
  }
};
dataConnection();

// ROUTING IN EXPRESS;
app.use("/api/v1", userAuth);
app.use("/api/v1", propertyEndpoint);
app.get("/mylove", (req, res) => {
  res.json({ message: "new api loading" });
});

app.listen(8080, () => {
  console.log(`server running on port 8080`);
});
