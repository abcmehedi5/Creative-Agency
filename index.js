const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { ServerApiVersion } = require('mongodb');
const cors = require('cors')
const RouteOrderHandler = require('../server/RouteHandler/RouteOrderHandler');
const RouteReviewHandler = require('../server/RouteHandler/ReviewHandler');
const AdminMakeHandler = require('./RouteHandler/AdminMakeHandle')
const AdminHandler = require('./RouteHandler/AdminHandler');
app = express();
app.use(bodyParser.json())


// url file show fornt end
app.use('/file', express.static('RouteHandler'))
app.use('/file', express.static('ReviewUploads'))


// app.use(bodyParser.urlencoded({ extended: false }))
dotenv.config();
// DATABASE CONNENTION WITH MONGOOSE START ...............

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1

}).then(() => {
    console.log("database connection successfull!")
}).catch((err) => {
    console.log(err)
});

// DATABASE CONNENTION WITH MONGOOSE END ...............

// REQUEST PROCESS............
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// APPLICATION ROUTING SETUP START ....................

// ORDER ROUTER
app.use('/orders', RouteOrderHandler);

// REVIEW ROUTER
app.use('/review', RouteReviewHandler);

//ADMIN MAKE ROUTE
app.use('/adminMake', AdminMakeHandler);

// ADMIN ROUTE
app.use('/admin', AdminHandler);

// APPLICATION ROUTING SETUP END  ....................


// 404 NOT FOUND HANDLER START.............

const notFoundHandler = (err, req, res, next) => {
    next('your requested content was not found!')
}
// 404 NOT FOUND HANDLER END................


app.listen(process.env.PORT, () => {
    console.log(`app listening to port ${process.env.PORT}`);
})

