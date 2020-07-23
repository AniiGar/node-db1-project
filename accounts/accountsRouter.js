const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// //--------------------
//     //Create
// //--------------------
router.post('/', validateAccount, (req, res) => {
    db.select().from('accounts')
        .insert(req.body)
            .then(() => {
                res.status(201).json(req.body)
            })
            .catch(() => {
                res.status(500).json({message: 'failed to make post'})
            })
})

// //--------------------
//     //Read
// //--------------------
router.get('/', (req, res) => {
    db.select().from('accounts')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: 'Error returning accounts.', err})
        })
})

// //--------------------
//     //Read - id
// //--------------------
router.get('/:id', validateId, (req, res) => {
    const { id } = req.params

    db.select().from('accounts')
        .where({ id })
            .then(data => {
                res.status(200).json(data)
            })  
})

// //--------------------
//     //Update
// //--------------------
router.put('/:id',validateId, (req, res) => {
    const { id } = req.params;

    db.select().from('accounts')
        .where({ id })
            .update(req.body)
                .then(count => {
                    res.status(201).json({ updated: count })
                })
})

// //--------------------
//     //Delete
// //--------------------
router.delete('/:id', validateId, (req, res) => {
    const { id } = req.params;

    db.select().from('accounts')        
        .where({ id })
            .del()
                .then(count => {
                    res.json({ message: 'Account deleted' });
                })
})

// //--------------------
//     //Middleware
// //--------------------
function validateAccount(req, res, next) {
    const { name, budget } = req.body;

    if ( !name || !budget) {
        res.status(400).json({ message: 'Please add name and/or budget'})
    } else {
        next();
    }
}

function validateId(req, res, next) {
    const { id } = req.params

    db.select().from('accounts')
        .where({ id })
            .then(data => {
                if (data.length > 0) {
                    next();
                } else {                    
                    res.status(404).json({ message: 'Invalid Id'}) 
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Unable to retrieve account'})
            })

}

module.exports = router;