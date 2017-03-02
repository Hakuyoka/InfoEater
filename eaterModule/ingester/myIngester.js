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


var collection = function( name ){
    return db.collection( name );
};



new Promise((resolve,reject)=>{
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, mongodb){
        assert.equal(null, err);
        console.log("Connected correctly to server");
        db = mongodb;
        resolve();
    });

}).then(()=>{
    console.log("then")
    let mongo = function () {
        return {
            find: (query)=>{
                return collection(name).findOne({user: "hakuyoka"})
            },

            update: (body)=>{
                collection(name).findOneAndUpdate({user : "hakuyoka"},{ $push:{resource:body}})
            }
        }
    }();





    let baseModule = require("../base/InfoEater")
    class myIngester extends baseModule.Ingester{
        constructor(){
            super(()=>{})
        }
    }


    new myIngester()
    console.log(mongo)
    var wordMap = mongo.find()
        .then((data)=>{
        return data.resource[0].data
            .reduce((map, val)=>{
                if(map[val]){
                    map[val] = map[val] + 1
                }else{
                    map[val] = 1
                }
                return map
            },[])
        })
        .then(console.log)


    function collect(data) {

    }

})


//
//
//
// let baseModule = require("../base/InfoEater")
// let mongo = require("../../mongo")
// class myIngester extends baseModule.Ingester{
//     constructor(){
//         super(()=>{})
//     }
// }
//
//
// new myIngester()
//
// mongo.find()
//
//
// function collect(data) {
//
// }
//
