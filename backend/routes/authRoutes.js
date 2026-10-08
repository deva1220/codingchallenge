const express = require("express");
const { authenticateUser } = require("../services/userService");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { userId, password, role } = req.body;

        if (!userId || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "User ID, password and role are required"
            });
        }

        const user = await authenticateUser(userId, password, role);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid login credentials"
            });
        }

        // Don't send password to frontend
        const { password: _, ...safeUser } = user;

        res.json({
            success: true,
            message: "Login successful",
            user: safeUser
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = router;