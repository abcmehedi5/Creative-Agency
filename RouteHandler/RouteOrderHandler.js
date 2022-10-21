const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path')
const fs = require('fs');
//SCHEMA IMPORT
const orderSchema = require('../../server/Schemas/OrderSchema');
// SCHEMA MODEL
const order = new mongoose.model('order', orderSchema); // order = model name & data base collection

// FILE UPLOADS START.........................
//DEFINE THE STORAGE

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
            .replace(fileExt, '')
            .toLocaleLowerCase()
            .split(' ')
            .join('-') + '-' + Date.now;
        cb(null, fileName + fileExt);
    }
});

const UPLOAD_FOLDER = `${__dirname}/Uploads/OrderUploads`

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000, // 1MB
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only jpg, png ,jpg formate allowed!'));
        }
    }
})


// FILE UPLOADS END.........................


//GET ALL THE ORDER START.................

router.get('/servicelist',  (req, res) => {
    const email = req.query.email
    order.find({email:email}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json(data)

        }
    })
});

//GET ALL THE ORDER END.................


//GET ALL THE ORDER START.................

router.get('/allOrder',  (req, res) => {
    order.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json(data)

        }
    })
});

//GET ALL THE ORDER END.................




//GET A ORDER  BY ID
router.get('/order:id', async (req, res) => {

});

//POST A ORDER START.................

router.post('/orderpost', upload.single('file'), (req, res, next) => {
    const newOrder = new order({
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        projectDetails: req.body.projectDetails,
        price: req.body.price,
        status: req.body.status,
        img: req.file.filename,
    })
    newOrder.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {

            res.status(200).json({
                message: "Order was inserted successfully!"
            })
        }
    });
});

//POST A ORDER END..................

//PUT/PATCH, UPDATE ORDER START ................

router.put('/orderUpdate:id', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const graphic = req.body.graphic;
    const projectDetails = req.body.projectDetails;
    order.updateOne({ _id: req.params.id }, {
        $set: { name: name, email: email, graphic: graphic, projectDetails: projectDetails }
    }, (err) => {
        if (err) {
            res.status(500).json({
                error: "Therer was a server side error"
            })
        } else {
            res.status.json({
                message: "Order update successfully!"
            })
        }
    })
});

//PUT/PATCH, UPDATE ORDER END ................


// STATUS UPDATE START .....................
router.patch('/statusUpdate/:id', (req, res) => {
    order.updateOne({ _id: req.params.id }, {
        $set: { status: req.body.status }
    }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error"
            })
        } else {
            res.status(200).json({
                message: " update successful"
            })
        }
    })
})

// STATUS UPDATE END .....................


// DELETE ORDER START ........................
router.delete('/serviceDelete/:id', (req, res) => {
    order.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error"
            })
        } else {
            res.status(200).json({
                message: "Service Delete Successful"
            })
        }
    })
});

// DELETE ORDER END ........................











// router.get('/serviceDelete/:id', (req, res) => {
//     order.find({}, (err, data) => {
//         if (err) {
//             res.status(500).json({
//                 error: "There was a server side error!"
//             })
//         } else {
//             // res.status(200).json(data)

//             console.log("mehedi;", data);

//             // fs.unlink(`${__dirname}/Uploads/OrderUploads/${data.img}`, (err) => {
//             //     if (err) {
//             //         console.log(err);
//             //     } else {

//             //         res.status(200).json({
//             //             message: "Service Delete Successful"
//             //         })
//             //     }

//             // })
//         }
//     })
// });










module.exports = router
