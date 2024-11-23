

const getDocuments = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getDocuments");
    // Execute query 
    try {
    
        
        res.status(200).send(JSON.stringify('Inside documents route'));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`library error--> ${err}`);
    }
};

module.exports = {
    getDocuments
};