const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactAbout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  visited: {
    type: Boolean,
    required: false,
    default: false
  },
  content: {
    type: String,
    required: true
  },
  
},{
  timestamps: true
});

exports.Notification = mongoose.model('Notification', NotificationSchema);