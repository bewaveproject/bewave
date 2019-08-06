const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const spotSchema = Schema({
  name: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  lat: Number,
  lng: Number
});

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot