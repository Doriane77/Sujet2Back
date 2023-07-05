require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./Config/db");
const express = require("express");
const cors = require("cors");

connectDB();

app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./Routes/UsersR");
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

app.listen(process.env.PORT || 3200, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
