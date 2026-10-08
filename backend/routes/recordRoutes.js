const express = require("express");
const { getRecordsForUser } = require("../services/recordService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { userId, role, delay } = req.query;

        if (!userId || !role) {
            return res.status(400).json({
                success: false,
                message: "userId and role are required"
            });
        }

        const records = await getRecordsForUser(userId, role);

        const delayTime = Number(delay) || 0;

        setTimeout(() => {
            res.json({
                success: true,
                count: records.length,
                records
            });
        }, delayTime);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch records"
        });
    }
});

module.exports = router;