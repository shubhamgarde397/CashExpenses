var common_data = require('./SERVER/data.json');
var express = require(common_data.required.express);
var app = express();
app.use(express.static(__dirname));
var cors = require(common_data.required.cors)
app.use(cors());
var exec = require('child_process').execFile;

var Card = require('./SERVER/Card');
// var Category = require('./SERVER/Category');
var Wallet = require('./SERVER/Wallet');

app.use('/Card', Card);
// app.use('./Category', Category);
app.use('/Wallet', Wallet);

app.get('/name', function (req, res) {
    var spawn = require("child_process").spawn;
    var process = spawn('python', ["./hello.py"]);
    process.stdout.on('data', function (data) {
        res.send(data.toString());
    })
});

app.listen(3000, function () {
    console.log("SERVER STARTED");
});

// filepath = "FILES_SERVER/light.txt"
// with open(filepath) as fp:
//     response = {}
//     date = fp.readline()[0:8]
//     time = fp.readline()[9:17]
//     cnt = 1
//     while date:
//         print("Line {} :: Date: {} ".format(cnt, date.strip()))
//         print("\n")
//         date = fp.readline()[0:8]
//         cnt += 1
