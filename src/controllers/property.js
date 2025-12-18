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
        .json({ message: "each of this  field should be inputed" });
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

const getAllProperty = async (req, res) => {
  try {
    const getAllProperty = await Property.find();
    res.status(200).json({
      success: true,
      data: getAllProperty,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "property not found" });
    }
    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProperty) {
      return res.status(400).json({
        message: "property not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "internal server Error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProperty = await Property.findByIdAndDelete(id);
    if (!deleteProperty) {
      returnres.status(404).json({
        message: "property not found",
      });
    }
    res.status(200).json({
      suceess: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  postProperty,
  getAllProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
