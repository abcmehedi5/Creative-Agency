const mongoose = require('mongoose');
const adminMakeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }


})

module.exports = adminMakeSchema