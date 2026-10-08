const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "NSQTech backend is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});