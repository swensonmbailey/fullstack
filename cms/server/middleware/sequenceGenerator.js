let Sequence = require('../models/sequence');

const mongoose = require('mongoose');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

async function sequenceGenerator(collectionType) {
  let query;
  
  try{
   query = await Sequence.findOne();
  

    
  }catch(err){
      console.log('in querySequnce')
  }


  sequenceId = query._id;
 
  maxDocumentId = query.maxDocumentId;
  maxMessageId = query.maxMessageId;
  maxContactId = query.maxContactId;

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  await Sequence.findOneAndUpdate({_id: sequenceId}, {$set: updateObject}, { new: true }); 


  return nextId;
}

module.exports = {sequenceGenerator};
 