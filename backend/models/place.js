const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  city_id: Number,
  name: String,
  currency: String,
  itemsFiltered: Object,

});


module.exports = mongoose.model("Place", placeSchema);
