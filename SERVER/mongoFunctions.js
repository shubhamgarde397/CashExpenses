/***
 * 0.GET
 * 1.POST
 * 2.DELETE_BY__ID
 * 3.UPDATE
 * 4.COUNT
 * 5.COUNT-ADVANCED
 * 6.DELETE_BY_SOMETHING_ELSE
 */

var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var mongodb = require(common_data.required.mongodb);
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
const url = common_data.required.url;
const dbName = common_data.database.dbname;
app.use(bodyParser.urlencoded({ extended: true }));

function getTableName(tablename) {
    var promise = new Promise((resolve, reject) => {
        tablename = tablename.replace(/ /g, "_");
        resolve(tablename);
    });
    return promise;
}

module.exports = {
    handleData: function (apiCall, collectionName, sortData = {}, findData = {}, body = {}, manupulateData = {}) {
        var promise = new Promise((resolve, reject) => {
            mongoClient.connect(url, function (err, client) {
                if (err) { console.log(common_data.Messages.error, err); }
                else {
                    getTableName(collectionName)
                        .then((tableName) => {
                            var db = client.db(dbName);
                            switch (apiCall) {
                                case 0:
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
                                    break;
                                case 1:
                                    db.collection(tableName)
                                        .insertOne(body, function (result, err) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(result);
                                            }
                                            client.close();
                                        });
                                    break;
                                case 2:
                                    db.collection(tableName)
                                        .deleteOne({ _id: new mongodb.ObjectID(manupulateData) }, function (result, err) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(result);
                                            }
                                            client.close();
                                        });
                                    break;
                                case 3:
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
                                    break;
                                case 4:
                                    db.collection(tableName).find(findData)
                                        .count(function (err, result) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                resolve((JSON.stringify(result)));
                                            }
                                        });
                                    client.close();
                                    break;
                            }
                        });
                }
            });
        });
        return promise;
    },
    updateWallet: function (new_money, money, collectionName, mode, id) {
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
}