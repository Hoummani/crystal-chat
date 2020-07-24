const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  friend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: false
    }
  ]
  
},{
  timestamps: true
});

exports.Contact = mongoose.model('Contact', ContactSchema);