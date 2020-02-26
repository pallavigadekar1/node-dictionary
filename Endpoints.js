const host_data = require('./host_config'),
    request = require('request');


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const getRandomWord = () => {
    return new Promise((resolve, reject) => {
        let url;
        url = `${host_data.host}/words/randomWord?api_key=${host_data.api_key}`;
        request(url, (err, res, body) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            body=JSON.parse(body);
            resolve(body.word)
        })
    })
}

const makeHttpRequest = (op, word) => {
    return new Promise((resolve, reject) => {

        url = `${host_data.host}/word/${word}/${op}?api_key=${host_data.api_key}`;

        request(url, (error, res, body) => {

            if (error) {
                reject(error);
            }

            resolve(body);

        })
    })
}
module.exports = {
    makeHttpRequest: makeHttpRequest,
    getRandomWord: getRandomWord
}