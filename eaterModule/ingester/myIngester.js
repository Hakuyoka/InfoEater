/**
 *
 * オレオレ
 * Created by kotato on 2017/02/28.
 */

/**
 * node-mongodbのドキュメント
 * http://mongodb.github.io/node-mongodb-native/2.1/
 */
let db;
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let name = "resource"

// Connection URL
let url = 'mongodb://localhost:27017/infoEater';


let collection = function( name ){
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
    let mongo = function () {
        return {
            find: ()=>{
                return  new Promise((resolve,reject)=>{
                    collection(name).find({user: "hakuyoka"})
                        .toArray((err, docs)=>{
                            assert.equal(err, null);
                            resolve(docs)
                        })
                })
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
    mongo.find()

        .then((docs)=>{
            return docs.map((doc)=> {
                //データの配列
                let arr = doc.resource.data
                //出現回数の合計
                let wordTotal = 0
                //各単語の出現率
                let wordArray;
                wordArray = arr.reduce((arr, val) => {
                    //レガシー感がする直したい
                    let isExist = false

                    let target;
                    let word;
                    //参照透過がキエルゥゥ。でも、参照は欲しい
                    for (let index in arr) {
                        target = arr[index];
                        word = target.word;
                        if (word === val) {
                            target.num++
                            isExist = true
                            break
                        }
                    }
                    if (!isExist) {
                        arr.push({word: val, num: 1})
                    }
                    wordTotal++
                    return arr
                }, []);

                return {wordArray: wordArray, totalWordNum:wordTotal, url:doc.url}
            })

        })
        .then(langUtisl.tfDif)
        .then((results)=>{
            var vectors = langUtisl.makeVector(results)
            kmeans.clusterize(vectors, {k: 2}, (err,res) => {
                if (err) console.error(err);
                else {
                    res.map((val)=>{
                        console.log(val.clusterInd)
                        val.clusterInd.map(index=>{
                            console.log(results[index].url)
                        })
                    })
                }
            });
        })


})
const kmeans = require('node-kmeans');
const langUtisl = require('../utils/natunalLanguageUtil');

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
