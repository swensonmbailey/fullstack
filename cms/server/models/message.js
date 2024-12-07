const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    id: { type: String, required: true },
    subject: { type: String },
    msgText: { type: String, required: true },
//    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
    sender: { type: String}
});

module.exports = mongoose.model('Message', messageSchema);