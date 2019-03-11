const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: Time,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Timer = mongoose.model('timer', TimerSchema);