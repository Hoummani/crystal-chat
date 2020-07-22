const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false,
    default: '/img/avatars/default-avatar.png'
  },
  leaved: {
    type: Boolean,
    default: false,
    required: false,
  },
  isOnline:{
    type: Boolean,
    required: false
  }
},{
  timestamps: true
});

exports.User = mongoose.model('User', UserSchema);