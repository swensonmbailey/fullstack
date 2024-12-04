let Sequence = require('../models/sequence');
let Contact = require('../models/contact')
const mongoose = require('mongoose');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

// async function querySequence() {

//     try{
//       let query = await Sequence.find({maxDocumentId});

//       // sequenceId = query._id;
//       // maxDocumentId = query.maxDocumentId;
//       // maxMessageId = query.maxMessageId;
//       // maxContactId = query.maxContactId;

//       return query;
      
//     }catch(err){
//         console.log('in querySequnce')
//         return res.status(500).json({
//             title: 'An error occurred',
//             error: err
//           });
//     }

  

// }

async function sequenceGenerator(collectionType) {
  let query;
  try{
   await Contact.find().then(function(users){
    query = users;
   });
   console.log(query);

    
  }catch(err){
      console.log('in querySequnce')
      // return res.status(500).json({
      //     title: 'An error occurred',
      //     error: err
      //   });
  }


  sequenceId = query._id;
  console.log(sequenceId);
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

  Sequence.findOneAndUpdate({_id: sequenceId}, { $set: updateObject}, { upsert: true, useFindAndModify: false });
  
  
  // ({_id: sequenceId}, {$set: updateObject});

  return nextId;
}

module.exports = {sequenceGenerator};
