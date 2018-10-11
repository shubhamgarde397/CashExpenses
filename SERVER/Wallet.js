var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());

router.get('/getCashExpenses', function (req, res) {
    var receivedData = mongoFunctions.handleData(0, 'Cash', { "Date": 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/Wallet', function (req, res) {
    var receivedData = mongoFunctions.handleData(0, 'Wallet')
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.use(bodyParser.json());

router.post('/addWalletExpenses', urlencodedParser, function (req, res) {
    var body = req.body;
    var receivedData = mongoFunctions.handleData(1, 'Cash', {}, {}, body)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});



router.post('/addcategorydata', urlencodedParser, function (req, res) {
    var body = req.body;
    var receivedData = mongoFunctions.handleData(1, 'Categories', {}, {}, body)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete('/delcategorydata/:id', function (req, res) {
    console.log(req.params.id);
    var receivedData = mongoFunctions.handleData(2, 'Categories', {}, {}, {}, req.params.id)
        .then(function (result) {
            console.log(result);
            res.send(result);

        })
        .catch((err) => {
            res.send(err);
        });
})

router.get('/getcategorydata', function (req, res) {
    var receivedData = mongoFunctions.handleData(0, 'Categories', { "category": 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.use(bodyParser.json());
router.post('/Wallet/:id', urlencodedParser, function (req, res) {
    mongoFunctions.handleData(0, 'Wallet')
        .then((data) => {

            if (req.params.id === 'remove' && data[0].Money > 0) {
                mongoFunctions.updateWallet(req.body.Withdraw, data[0].Money, 'Wallet', req.params.id, data[0]._id)
                    .then((data) => {
                        console.log("updated", data);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            }


            if (req.params.id === 'add') {
                mongoFunctions.updateWallet(req.body.Deposit, data[0].Money, 'Wallet', req.params.id, data[0]._id)
                    .then((updateddata) => {
                        console.log("updated", updateddata);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            }
            if (data[0].Money < 0) {
                console.log("nomey")
                res.send("no money", data);

            }


        })
        .catch((err) => {
            res.send(err);
        });
});





module.exports = router