const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  photo: String,
  spots: [{type: Schema.Types.ObjectId, ref: 'Spot'}],
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;