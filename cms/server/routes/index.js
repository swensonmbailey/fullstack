const routes = require('express').Router();


routes.use('/documents', require('./documents'));
routes.use('/messages', require('./messages'));
routes.use('/contacts', require('./contacts'));


routes.use(
    '/',
    (docData = (req, res) => {
        let docData = {
        documentationURL: '',
        };
        res.send(docData);
    })
);

module.exports = routes;