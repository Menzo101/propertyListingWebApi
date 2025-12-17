const express = require("express");

const propertyController = require("../controllers/property.js");

const router = express.Router();

router.post("/property", propertyController.postProperty);

module.exports = router;
