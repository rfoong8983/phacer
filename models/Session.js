const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    curr: {
        type: String,
        required: false,
        unique: true
    },
    find: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = Session = mongoose.model('session', SessionSchema);

