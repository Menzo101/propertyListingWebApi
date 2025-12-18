const express = require("express");

const propertyController = require("../controllers/property.js");

const router = express.Router();

router.post("/property", propertyController.postProperty);
router.get("/property", propertyController.getAllProperty);
router.get("/property/:id", propertyController.getPropertyById);
router.post("/property/:id", propertyController.updateProperty);
router.delete("/property/:id", propertyController.deleteProperty);

module.exports = router;
