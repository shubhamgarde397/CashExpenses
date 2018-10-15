var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());


router.post('/addCardDebitDetails', urlencodedParser, function (req, res) {
    var body = req.body;
    var receivedData = mongoFunctions.handleData(1, 'CardDebit', {}, {}, body)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/getCardDebitDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(0, 'CardDebit', { 'Date': 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/addCardCreditDetails', urlencodedParser, function (req, res) {
    var body = req.body;
    var receivedData = mongoFunctions.handleData(1, 'CardCredit', {}, {}, body)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/getCardCreditDetails', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(0, 'CardCredit', { 'Date': 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router