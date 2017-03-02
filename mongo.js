/**
 * Created by kotato on 2017/02/28.
 */
/**
 * node-mongodbのドキュメント
 * http://mongodb.github.io/node-mongodb-native/2.1/
 */
var db;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var name = "resource"

// Connection URL
var url = 'mongodb://localhost:27017/infoEater';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, mongodb){
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db = mongodb;
});

var collection = function( name ){
    return db.collection( name );
};


module.exports = function () {
    return {
        find: (query)=>{
            collection(name).findOne({user: "hakuyoka"}).toArray((err,docs)=>{
                console.log(docs)
            })
        },

        update: (body, url)=>{
            collection(name).update({user : "hakuyoka", url:url},{ $set:{resource:body}}, {upsert:true})
                .then((val)=>{
                    console.log("success", val)
                },(err)=>{
                    console.log("err",err)
                })
        },
    }
}();