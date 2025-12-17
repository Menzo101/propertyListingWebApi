const Property = require("../models/propertymodel.js");

const postProperty = async (req, res) => {
  try {
    const {
      propertyName,
      description,
      price,
      houseType,
      location,
      houseStatus,
    } = req.body;
    if (!propertyName || !description || !price) {
      return res
        .status(400)
        .json({ message: "each of this  filed must be inputed" });
    }
    const newProperty = await Property.create({
      propertyName,
      description,
      price,
      houseType,
      location,
      houseStatus,
    });
    return res.status(201).json({
      success: true,
      message: "property created successfully",
      newProperty,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "internal error" });
  }
};

module.exports = { postProperty };
