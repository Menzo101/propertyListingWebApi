const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Enter a price"],
      index: true,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: String,
      },
    ],
    houseType: {
      type: String,
      required: [true, "House type is required"],
      index: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      index: true,
    },
    houseStatus: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  },
  { timestamps: true }
);

// Compound index for fast filtering
propertySchema.index({ location: 1, houseType: 1 });

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
