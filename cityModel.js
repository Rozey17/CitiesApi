const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "A country needs a name"]
  },
  geonameid: {
    type: Number
  },
  name: {
    type: String,
    required: [true, "A city needs a name"]
  },
  subcountry: {
    type: String,
    required: [true, "A subcountry needs a name"]
  }
});

const City = new mongoose.model("City", citySchema);

module.exports = City;
