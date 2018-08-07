//npm install cors
//npm install mongo
//npm install node
//npm install express
var express = require('express');
var app = express();
app.use(express.static(__dirname));
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());
var http = require('http')


const url = "mongodb://localhost:27017";
const dbName = "CashExpenses";
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    // res.header("Access-Control-Allow-Methods", "*");
    //Either unComment this above 3 lines or install cors
    next();
});

// ***************************************
// *            GET REQUESTS             *
// ***************************************

function fetch_DB_Data(collectionName, id = 0) {

    var promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, function (err, client) {
            if (err) {
                console.log("Error", err);
            }
            else {
                getTableName(collectionName)
                    .then((tableName) => {
                        if (id == 0) {
                            var db = client.db(dbName);
                            db.collection(tableName)
                                .find().toArray(function (err, result) {
                                    if (err) {
                                        console.log(err)
                                        reject(err);
                                    }
                                    else {

                                        resolve(result);
                                    }
                                    client.close();
                                });
                        } else {
                            var db = client.db(dbName);
                            db.collection(tableName)
                                .find({ "_id": new mongodb.ObjectID(id) }).toArray(function (err, result) {
                                    if (err) {
                                        console.log(err)
                                        reject(err);
                                    }
                                    else {

                                        resolve(result);
                                    }
                                    client.close();
                                });

                        }
                    });

            }
        });
    });
    return promise;
}

function store_DB_Data(collectionName, body) {
    var promise = new Promise((resolve, reject) => {
        getTableName(collectionName)
            .then((tableName) => {

                mongoClient.connect(url, function (err, client) {
                    if (err) {
                        console.log("Error", err);
                    }
                    else {
                        var db = client.db(dbName);
                        var collection = db.collection(tableName);
                        collection.insert(body, function (result, err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                            client.close();
                        });
                    }
                });
            });

    });
    return promise;

}

function delete_DB_Data(collectionName, id) {
    var promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, function (err, client) {
            if (err) {
                console.log("Error", err);
            }
            else {
                var db = client.db(dbName);
                var collection = db.collection(collectionName);
                collection.deleteOne({ _id: new mongodb.ObjectID(id) }, function (result, err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                    client.close();
                });
            }
        });
    });
    return promise;
}


app.get('/getCashExpenses', function (req, res) {
    var receivedData = fetch_DB_Data('Cash')
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});


app.use(bodyParser.json());

app.post('/addWalletExpenses', urlencodedParser, function (req, res) {
    var body = req.body;
    var receivedData = store_DB_Data('Cash', body)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});




app.delete('/test', function (req, res) {
    var receivedData = delete_DB_Data(req.params.data, req.params.id)//tablename and _id
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});



app.put('/updateregulartruckdata', urlencodedParser, function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("Error", err);
        }
        else {

            var db = client.db(dbName);

            var collection = db.collection("RegularTruck");
            collection.update({ "_id": new mongodb.ObjectID(req.body.id) }, { "regulartruck": req.body.truckno }, function (result, err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(common_data.Messages.success.update);
                }
            });

            client.close();
        }
    });
});

// *********** END OF PUT REQUESTS **************

// app.listen(3000, '10.222.67.66', function () {

//     console.log("NRCM MAIN SERVER : 3000")
// });

app.listen(3000, function () {
    console.log("SERVER STARTED");
});

function getTableName(tablename) {
    var promise = new Promise((resolve, reject) => {
        tablename = tablename.replace(/ /g, "_");
        resolve(tablename);
    });
    return promise;
}