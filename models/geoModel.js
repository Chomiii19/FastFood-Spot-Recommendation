import mongoose from "mongoose";

const geoSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point", "Polygon"],
      required: true,
    },
    coordinates: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  properties: {
    opening_hours: String,
    name: String,
    amenity: String,
    shop: String,
  },
});

const GeoModel = mongoose.model("geolocation", geoSchema);
export default GeoModel;
