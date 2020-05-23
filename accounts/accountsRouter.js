const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// //--------------------
//     //Create
// //--------------------
router.post('/', (req, res) => {
    db.select().from('accounts')
        .insert(req.body)
            .then(data => {
                res.status(201).json(req.body)
            })
            .catch(err => {
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
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.select().from('accounts')
        .where({ id })
            .then(data => {
                if(data) {
                    res.status(200).json({data})
                } else {
                    res.status(400).json({message: 'Account not found.'})
                }
            })
            .catch(err => {
                res.status(500).json({message: 'Error returning account.', err})
            })
})

// //--------------------
//     //Update
// //--------------------
router.put('/:id', (req, res) => {
    const { id } = req.params;

    db.select().from('accounts')
        .where({ id })
            .update(req.body)
                .then(count => {
                    if(count) {
                        res.json({ updated: count })
                    } else {
                        res.status(404).json({ message: 'invalid id' })
                    }
                })
                .catch(err => {
                    res.status(500).json({ message:'failed to update', err})
                })
})

// //--------------------
//     //Delete
// //--------------------
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.select().from('accounts')        
        .where({ id })
            .del()
                .then(count => {
                    if (count) {
                        res.json({ deleted: count });
                    } else {
                        res.status(404).json({ message: 'invalid id' });
                    }
                })
                .catch(err => {
                    res.status(500).json({message:'failed to update', err})
                })
})

module.exports = router;