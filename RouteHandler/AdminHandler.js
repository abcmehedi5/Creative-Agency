const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const admin = new mongoose.model('admin');

router.post('/isAdmin', (req, res) => {

    admin.find({ email: req.body.email }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.json(data.length > 0)
        }
    })
})

module.exports = router