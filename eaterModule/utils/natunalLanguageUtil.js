/**
 * Created by kotato on 2017/03/03.
 */


module.exports = function(){
    return {
        tfDif: (wordMaps) => {
            let totalMapLength = wordMaps.length
            return wordMaps.map((wordMap) => {
                let totalWordNum = wordMap.totalWordNum
                let wordArray = wordMap.wordArray
                return {
                    url: wordMap.url,
                    words: wordArray.map((word) => {
                        let tf = word.num / totalWordNum
                        let idf = Math.log(totalMapLength / countDocumentHaving(word.word))
                        // console.log(word.word,tf,idf)
                        return {word: word.word, tf: tf, idf: idf, tfidf: tf * idf}
                    })
                }
            })

            function countDocumentHaving(word) {

                return wordMaps.filter((wordMap) => {
                    return wordMap.wordArray.some((map) => {
                        return word === map.word
                    })
                }).length
            }
        },

        makeVector:(results)=>{
            let allWords = results.reduce((arr,result)=>{

                return result.words.map((word)=>{
                    return word.word
                })
                    .reduce((arr,word)=> {
                        if(arr.indexOf(word) === -1)
                            arr.push(word)
                        return arr
                    },arr)
            },[])

            let vectors = results.map((result)=>{
                let wordMaps = result.words
                return allWords.map((word)=>{
                    let val = 0
                    let targetWord = wordMaps.filter((wordMap)=>{
                        return wordMap.word === word
                    })

                    if(targetWord.length === 1){
                        val = targetWord[0].tfidf
                    }

                    return val
                })
            })

            return vectors
        }
    }
}()

// var data = [
//     [1,1,1,1,1,1,1],
//     [0,1,0,1,1,1,1],
//     [0,0,0,1,1,0,1],
//     [0,0,0,1,1,1,0],
//     [0,0,1,1,0,0,1],
//     [1,1,0,1,0,0,1],
// ]

var data = [
    [15, 25, 0, 0],
    [0, 0,  15, 25],
    [25,0,  0, 0],
    [0, 0, 25, 4]
]
const kmeans = require('node-kmeans');

kmeans.clusterize(data, {k: 2}, (err,res) => {
    if (err) console.error(err);
    else console.log(res)

});