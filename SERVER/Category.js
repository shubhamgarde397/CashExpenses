var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());


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

module.exports = router