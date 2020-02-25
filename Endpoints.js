const host_data = require('./host_config'),
    https = require('https');



const getRandomWord = () => {
    return new Promise((resolve, reject) => {
        let url, res;
        url = `${host_data.host}/words/randomWord?api_key=${host_data.api_key}`;
        res = https.get(url);
        return res;
    })
}

const makeHttpRequest = (op, word) => {
    return new Promise((resolve, reject) => {
        url = `${host_data.host}/word/${word}/${op}?api_key=${host_data.api_key}`;
        console.log('api url----->',url);
        
        https.get(url,(res)=>{
            console.log('res',res);
            res.on('error',(error)=>{
                console.log('error',error);
                return reject(error);
            })
            
            res.on("data",(res)=>{
                return resolve(res.data);
            })
        })
    })
}
module.exports = {
    makeHttpRequest: makeHttpRequest,
    getRandomWord: getRandomWord
}