const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

    const accountsRouter = require('../accounts/accountsRouter');

server.use(express.json());

    server.use('/api/accounts', accountsRouter);

    server.get('/', (req, res) => {
        res.json({message:'Server running'})
    })

module.exports = server;
