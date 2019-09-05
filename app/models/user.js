const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: Number,
  push_token: String
});

UserSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('User', UserSchema);