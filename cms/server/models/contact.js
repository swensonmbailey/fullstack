const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   email: { type: String},
   phone: { type: String, required: true },
   imageUrl: { type: String, required: true },
   group: [{type: String}]
});

module.exports = mongoose.model('Contact', contactSchema);