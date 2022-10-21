const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const adminMakeSchema = require('../../server/Schemas/AdminMakeSchema')
const adminMake = new mongoose.model('admin', adminMakeSchema);

// POST ADMIN DATA START ...............
router.post('/adminpost', (req, res, next) => {
    console.log(req.body.email);
    const newAdminMake = new adminMake({
        name: req.body.name,
        email: req.body.email
    })
    newAdminMake.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json({
                message: "Admin data inserted successful"
            })
        }
    })
})

// POST ADMIN DATA START ...............

router.get('/adminget', (req, res) => {
    adminMake.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json(data)
        }
    })
})

module.exports = router