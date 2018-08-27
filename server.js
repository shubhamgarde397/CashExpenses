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


function getTableName(tablename) {
    var promise = new Promise((resolve, reject) => {
        tablename = tablename.replace(/ /g, "_");
        resolve(tablename);
    });
    return promise;
}

function handleData(apiCall, collectionName, sortData = {}, findData = {}, body = {}, manupulateData = {}) {
    var promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, function (err, client) {
            if (err) { console.log(common_data.Messages.error, err); }
            else {
                getTableName(collectionName)
                    .then((tableName) => {
                        var db = client.db(dbName);

                        if (apiCall == 0) {
                            db.collection(tableName)
                                .find(findData).sort(sortData).toArray(function (err, result) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(result);
                                    }
                                    client.close();
                                });
                        }
                        if (apiCall == 1) {
                            db.collection(tableName)
                                .insert(body, function (result, err) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(result);
                                    }
                                    client.close();
                                });
                        }
                        if (apiCall == 2) {
                            db.collection(tableName)
                                .deleteOne({ _id: new mongodb.ObjectID(manupulateData) }, function (result, err) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        console.log("done");
                                        resolve(result);
                                    }
                                    client.close();
                                });
                        }
                        if (apiCall == 3) {
                            db.collection(tableName)
                                .update({ _id: new mongodb.ObjectID(manupulateData) },
                                    body,
                                    function (result, err) {
                                        if (err) {
                                            reject(err);
                                        }
                                        else {
                                            resolve("Data updated Successfully!");
                                        }
                                    });

                            client.close();
                        }
                        if (apiCall == 4) {
                            db.collection(tableName).find(findData)
                                .count(function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        resolve((JSON.stringify(result)));
                                    }
                                });
                            client.close();
                        }

                    });
            }
        });
    });
    return promise;
}


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

app.get('/getCashExpenses', function (req, res) {
    var receivedData = handleData(0, 'Cash', { "Date": 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.get('/Wallet', function (req, res) {
    var receivedData = handleData(0, 'Wallet')
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
    var receivedData = handleData(1, 'Cash', {}, {}, body)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});



app.post('/addcategorydata', urlencodedParser, function (req, res) {
    var body = req.body;
    var receivedData = handleData(1, 'Categories', {}, {}, body)
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.delete('/delcategorydata/:id', function (req, res) {
    console.log(req.params.id);
    var receivedData = handleData(2, 'Categories', {}, {}, {}, req.params.id)
        .then(function (result) {
            console.log(result);
            res.send(result);

        })
        .catch((err) => {
            res.send(err);
        });
})

app.get('/getcategorydata', function (req, res) {
    var receivedData = handleData(0, 'Categories', { "category": 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.use(bodyParser.json());
app.post('/Wallet/:id', urlencodedParser, function (req, res) {
    handleData(0, 'Wallet')
        .then((data) => {

            if (req.params.id === 'remove' && data[0].Money > 0) {
                updateWallet(req.body.Withdraw, data[0].Money, 'Wallet', req.params.id, data[0]._id)
                    .then((data) => {
                        console.log("updated", data);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            }


            if (req.params.id === 'add') {
                updateWallet(req.body.Deposit, data[0].Money, 'Wallet', req.params.id, data[0]._id)
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



function updateWallet(new_money, money, collectionName, mode, id) {
    if (mode == "add") {
        new_money = new_money + money;
    }
    if (mode == "remove") {
        new_money = money - new_money;
    }
    var promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, function (err, client) {
            if (err) {
                console.log("Error", err);
            }
            else {
                var db = client.db(dbName);
                var collection = db.collection(collectionName);
                // 3,Wallet,{},{},{Money:new_money},id
                collection.update({ "_id": new mongodb.ObjectID(id) }, { Money: new_money }, function (result, err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve("Updated");
                    }
                    client.close();
                });
            }
        });
    });
    return promise;
}


app.delete('/test', function (req, res) {
    var receivedData = delete_DB_Data(req.params.data, req.params.id)//tablename and _id
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
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