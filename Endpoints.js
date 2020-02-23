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
        https.get(url).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
module.exports = {
    makeHttpRequest: makeHttpRequest,
    getRandomWord: getRandomWord
}