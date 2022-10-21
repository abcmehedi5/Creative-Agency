const mongooose = require('mongoose');
const reviewSchema = mongooose.Schema({
    name: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },

});


module.exports = reviewSchema;