const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  comment: String,
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  creatorName: String
}, {
  timestamps: true           
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;