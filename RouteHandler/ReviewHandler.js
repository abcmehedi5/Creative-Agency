const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose');
const reviewSchema = require('../../server/Schemas/ReviewSchema');
const review = new mongoose.model('review', reviewSchema);



// file upload..
// file upload path

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

const UPLOAD_FOLDER = `${__dirname}/Uploads/ReviewUploads`

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
// POST A REVIEW START................
router.post('/reviewPost', upload.single('file'), (req, res, next) => {
    const newReview = new review({
        name: req.body.name,
        email: req.body.email,
        companyName: req.body.companyName,
        description: req.body.description,
        status: req.body.status,
        img: req.file.filename,
    });

    newReview.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json({
                message: "Review was inserted successfully!"
            })
        }
    })

});
// POST A REVIEW END................

//GET REVIEW START...............

router.get('/reviewGet', (req, res) => {
    const email = req.query.email
    review.find({ email: email }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json(data)
        }
    })
})
//GET REVIEW END...............


//GET ALL REVIEW START...............

router.get('/reviewAll', (req, res) => {
    review.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json(data)
        }
    })
})
//GET ALL REVIEW END...............



// DELETE REVIEW START...................
router.delete('/revewDelete/:id', (req, res) => {
    review.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json({
                message: "Review was inserted successfully!"
            })
        }
    })
})
// DELETE REVIEW END...................

//STATUS UPDATE START...................

router.patch('/Reviewstatus/:id', (req, res) => {
    
    review.updateOne({ _id: req.params.id }, {
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
//STATUS UPDATE END...................

module.exports = router;