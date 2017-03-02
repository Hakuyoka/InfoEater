/**
 * Created by kotato on 2017/02/24.
 */

var kuromoji = require("kuromoji")
var builder = kuromoji.builder({
    dicPath: "node_modules/kuromoji/dict"
})


module.exports = function () {
    return {
        build: (text) => {
            return new Promise((resolve,reject)=>{
                try{
                    builder.build((err, tokenizer) => {

                        // 辞書がなかったりするとここでエラーになります(´・ω・｀)
                        if (err) {
                            throw err;
                        }
                        // tokenizer.tokenize に文字列を渡すと、その文を形態素解析してくれます。
                        console.log(text)
                        var tokens = tokenizer.tokenize(text)
                        resolve(tokens)
                    })

                }catch(e){
                    reject(new Error(""))
                }
            })
        }
    }
}()