const mongoose = require('mongoose');
const { type } = require('os');

const documentSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   url: { type: String, required: true },
   children: { type: mongoose.Schema.Types.Array, ref: 'Document'},
   description: {type: String}
});

module.exports = mongoose.model('Document', documentSchema);