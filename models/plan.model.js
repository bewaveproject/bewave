const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const planSchema = new Schema({
  place: String,
  date: Date,
  people: [{type: Schema.Types.ObjectId, ref: 'User'}],
  description: String,
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;