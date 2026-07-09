const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Recipe Sharing Community API",
        status: "Running",
        version: "1.0.0"
    });
});

app.get("/recipes", (req, res) => {
    res.send("All Recipes");
});
app.post("/recipes", (req, res) => {
    res.send("Recipe Added");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
