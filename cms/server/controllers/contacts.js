const sequenceGen = require('../middleware/sequenceGenerator');
const contact = require('../models/contact');
const conMod = require('../models/contact');
const ObjectId = require('mongoose').Types.ObjectId;


const getContacts = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getContacts");
    // Execute query 
    let query;
    try {
        
        query =  await conMod.find();
        
        for(let i = 0; i < query.length ; i++){
            let fullContacts;
            if(query[i].group){
               fullContacts = await populateGroup(query[i].group);
               query[i].group = fullContacts;
            }
    
            
        
        }
        
        res.status(200).send(JSON.stringify(query));

    } catch (err) {
        console.log(`getContacts error--> ${err}`);
        res.status(400).send(`Could not fetch Contacts.`);
    }
};

const getContactById = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getContacts");
    // Execute query 
    let query;
    try {
        
        query = await conMod.findOne({id: req.params.id });

        
        if(query.group){
            let fullContacts = await populateGroup(query.group);
            query.group = fullContacts;
        }
        
        res.status(200).send(JSON.stringify(query));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not fetch Contact.`);
    }
};


const postContact = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getContacts");
    let body = req.body;
    try {

        let id = await sequenceGen.sequenceGenerator('contacts');
        
        await conMod.create({
            id: id, 
            name: body.name,
            email: body.email,
            phone: body.phone,
            imageUrl: body.imageUrl,
            group: body.group
            
        })
        
        res.status(200).send(JSON.stringify('Contact Created & Posted to the Database.'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not post Contact.`);
    }
};

const putContact = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getContacts");
    // Execute query 
    let body = req.body;
    try {
        
        let updatedDoc =  { 
            name: body.name,
            email: body.email,
            phone: body.phone,
            imageUrl: body.imageUrl,
            group: body.group
        }
        

        await conMod.findOneAndUpdate({id: req.params.id}, {$set: updatedDoc}, { new: true }); 
        
        res.status(200).send(JSON.stringify('Contact updated!'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not update Contact.`);
    }
};


const deleteContact = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in deleteContacts");
    // Execute query 
    try {
    
        await conMod.deleteOne({id: req.params.id.toString()});

        res.status(200).send(JSON.stringify('Contact Deleted!'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not delete Contact.`);
    }
};

async function populateGroup(group){
    console.log("in populateGroup");
    
    for(let i = 0; i < group.length; i++){
        let _id = new ObjectId(group[i]);
        let fullContact = await conMod.findOne({_id: _id});
        group[i] = fullContact;
    }
    return group;
}


module.exports = {
    getContacts,
    getContactById,
    postContact,
    putContact,
    deleteContact
};