const express = require("express");

const {
    getUsers,
    addUser,
    updateUser,
    deleteUser
} = require("../services/userService");

const router = express.Router();


// GET ALL USERS
router.get("/", async (req, res) => {

    try {

        const users = await getUsers();

        // Don't send passwords to frontend
        const safeUsers = users.map(({ password, ...user }) => user);

        res.json({
            success: true,
            count: safeUsers.length,
            users: safeUsers
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch users"
        });
    }
});


// CREATE USER
router.post("/", async (req, res) => {

    try {

        const {
            userId,
            password,
            name,
            email,
            role
        } = req.body;

        if (!userId || !password || !name || !email || !role) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const users = await getUsers();

        const existingUser = users.find(
            user => user.userId === userId
        );

        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "User ID already exists"
            });
        }

        const newUser = await addUser({
            userId,
            password,
            name,
            email,
            role
        });

        const { password: _, ...safeUser } = newUser;

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: safeUser
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to create user"
        });
    }
});


// UPDATE USER
router.put("/:id", async (req, res) => {

    try {

        const updatedUser = await updateUser(
            req.params.id,
            req.body
        );

        if (!updatedUser) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { password: _, ...safeUser } = updatedUser;

        res.json({
            success: true,
            message: "User updated successfully",
            user: safeUser
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to update user"
        });
    }
});


// DELETE USER
router.delete("/:id", async (req, res) => {

    try {

        const deleted = await deleteUser(req.params.id);

        if (!deleted) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to delete user"
        });
    }
});


module.exports = router;