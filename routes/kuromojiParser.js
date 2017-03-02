var express = require('express');
var router = express.Router();
var kuromojiUtil = require("../public/js/kuromojiUtils")
var mongo = require("../mongo")

const filterSuffix = ["名詞","形容詞","形容動詞","動詞","副詞"]
const excludeWords = [")","(",",",":","=",";","{","}","、","/","\\","*"]

function filter(tokens) {
    return tokens
        .filter((val)=>{
            return filterSuffix.includes(val.pos)
        })
        .filter((val)=>{
            return excludeWords.every((word)=>{
                return val.basic_form.toLowerCase().indexOf(word) === -1
            })
        })
        .map((val)=>{
            if (val.pos === "動詞"){
                return val.basic_form.toLowerCase()
            }

            return val.surface_form.toLowerCase()
        })
}


/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body["text"])
    kuromojiUtil.build(req.body["text"])
        .then((tokens)=>{
            console.dir(tokens)
            var value = filter(tokens)

            res.setHeader("Access-Control-Allow-Origin","*")

            console.dir(value)
            res.send(value)
            mongo.update({data:value, date: new Date()}, req.header("referer"))
        },console.log)
});

module.exports = router;
