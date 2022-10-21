const mongooose = require('mongoose');
const orderSchema = mongooose.Schema({
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    projectDetails: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
    },

})

module.exports = orderSchema;