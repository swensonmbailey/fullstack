const sequenceGen = require('../middleware/sequenceGenerator');
const docMod = require('../models/document');


const getDocuments = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getDocuments");
    // Execute query 
    let query;
    try {
        
        query =  await docMod.find();
        
        res.status(200).send(JSON.stringify(query));

    } catch (err) {
        console.log(`getDocuments error--> ${err}`);
        res.status(400).send(`Could not fetch documents.`);
    }
};

const getDocumentById = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getDocuments");
    // Execute query 
    let query;
    try {
        
        query = await docMod.findOne({id: req.params.id });
        
        res.status(200).send(JSON.stringify(query));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not fetch document.`);
    }
};


const postDocument = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getDocuments");
    let body = req.body;
    try {

        let id = await sequenceGen.sequenceGenerator('documents');
        
        await docMod.create({
            id: id, 
            name: body.name, 
            url: body.url,
            children: body.children,
            description: body.description
            
        })
        
        res.status(200).send(JSON.stringify('Document Created & Posted to the Database.'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not post document.`);
    }
};

const putDocument = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getDocuments");
    // Execute query 
    let body = req.body;
    try {
        
        let updatedDoc =  { 
        name: body.name, 
        url: body.url,
        children: body.children,
        description: body.description
        }
        

        await docMod.findOneAndUpdate({id: req.params.id}, {$set: updatedDoc}, { new: true }); 
        
        res.status(200).send(JSON.stringify('Document updated!'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not update document.`);
    }
};


const deleteDocument = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in deleteDocuments");
    // Execute query 
    try {
    
        await docMod.deleteOne({id: req.params.id.toString()});

        res.status(200).send(JSON.stringify('Document Deleted!'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`Could not delete document.`);
    }
};


module.exports = {
    getDocuments,
    getDocumentById,
    postDocument,
    putDocument,
    deleteDocument
};