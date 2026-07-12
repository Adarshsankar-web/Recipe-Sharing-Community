const express = require("express");
require("dotenv").config();
const connectDB =require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/recipes", recipeRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Recipe Sharing Community API",
        status: "Running",
        version: "1.0.0"
    });
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
