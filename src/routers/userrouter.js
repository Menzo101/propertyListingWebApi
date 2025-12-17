const express = require("express");

// const authMiddlewares = require("../middlewares/tokenmiddlewares.js");
const registerController = require("../controllers/users.js");

const router = express.Router();

router.post("/registar", registerController.registerUser);
router.post("/login", registerController.login);
router.post("/logout", registerController.logout);
router.get("/users", registerController.getAllUsers);

module.exports = router;
