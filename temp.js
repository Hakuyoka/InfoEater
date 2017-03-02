/**
 * Created by kotato on 2017/03/01.
 */
const excludeWords = [")","(",",",":","=",";","{","}","、","/","\\","*"];

var test = ["()"].filter((val)=>{
        return excludeWords.every((word)=>{
            console.log(val,word,val.toLowerCase().indexOf(word) === -1)
            return val.toLowerCase().indexOf(word) === -1;
        });
    });

console.log(test)