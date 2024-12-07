const sequenceGen = require('../middleware/sequenceGenerator');
const messageMod = require('../models/Message');
const conMod = require('../models/contact');

const getMessages = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getMessages");
    // Execute query 
    let query;
    try {
        
        query =  await messageMod.find();
        
        for(let i = 0; i < query.length ; i++){
            let fullContact;
            fullContact = await populateSender(query[i].sender);
            console.log(fullContact);
            query[i].sender = fullContact;
            console.log(query[i].sender);
        }

        

        res.status(200).send(JSON.stringify(query));

    } catch (err) {
        console.log(`getMessages error--> ${err}`);
        res.status(400).send(`Could not fetch Messages.`);
    }
};

const getMessageById = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getMessages");
    // Execute query 
    let query;
    try {
        
        query = await messageMod.findOne({id: req.params.id });

        let fullContact = await populateSender(query.sender);

        query.sender = fullContact;
        
        res.status(200).send(JSON.stringify(query));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not fetch Message.`);
    }
};


const postMessage = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getMessages");
    let body = req.body;
    try {

        let id = await sequenceGen.sequenceGenerator('messages');
        
        await messageMod.create({
            id: id, 
            subject: body.subject, 
            msgText: body.msgText,
            sender: body.sender
            
        })
        
        res.status(200).send(JSON.stringify('Message Created & Posted to the Database.'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not post Message.`);
    }
};

const putMessage = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getMessages");
    // Execute query 
    let body = req.body;
    try {
        
        let updatedDoc =  { 
            subject: body.subject, 
            msgText: body.msgText,
            sender: body.sender
        }
        

        await messageMod.findOneAndUpdate({id: req.params.id}, {$set: updatedDoc}, { new: true }); 
        
        res.status(200).send(JSON.stringify('Message updated!'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not update Message.`);
    }
};


const deleteMessage = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in deleteMessages");
    // Execute query 
    try {
    
        await messageMod.deleteOne({id: req.params.id.toString()});

        res.status(200).send(JSON.stringify('Message Deleted!'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not delete Message.`);
    }
};

async function populateSender(senderId) {
    
    let fullContact = await conMod.findOne({id: senderId});
    
    return fullContact;
}

module.exports = {
    getMessages,
    getMessageById,
    postMessage,
    putMessage,
    deleteMessage
};