
const endPoints = require('./Endpoints');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const formArray = (words) => {
    let arr = [];
    words = JSON.parse(words);
    if (words && words.length > 0) {
        words = words.map(x => {
            return x.text;
        })
    }
    return words;
}

function defn(word) {
    endPoints.makeHttpRequest('definitions', word).then(res => {

        let result = formArray(res);
        console.log('The list of definitions :');
        console.log(result);
    }).catch(err => {
        console.log(err)
        console.log('Given word not found in dictionary!')
    })
    return null;
}
function synonym(word) {
    endPoints.makeHttpRequest('relatedWords', word).then(res => {
        res = JSON.parse(res);
        if (res.length > 1) {
            console.log('The list of synonyms :');
            console.log(res[1].words);
        }
        else if (res.length === 0) {
            console.log('The list of synonyms :');
            console.log(res[0].words);
        }
    }).catch(err => {
        console.log('Given word not found in dictionary!')
    })
    return;
}
function antonym(word) {
    endPoints.makeHttpRequest('relatedWords', word).then(res => {
        res = JSON.parse(res);
        if (res.length > 1) {
            console.log('The list of antonyms :');
            console.log(res[0].words);
        }
        else {
            console.log('Antonym not found')
        }
    }).catch(err => {
        console.log('Given word not found in dictionary!')
    })
    return;
}
function example(word) {
    endPoints.makeHttpRequest('examples', word).then(async (res) => {
        res = JSON.parse(JSON.stringify(res));
        console.log('ex', res);
        let arr = res.examples;
        let result = await formArray(arr);
        console.log('The list of example usage of word :');
        console.log(result);
    }).catch(err => {
        console.log('Given word not found in dictionary!')
    })
    return;
}

function getAll(word) {

    try {
        defn(word);
        synonym(word);
        antonym(word);
        example(word);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    defn,
    synonym,
    antonym,
    example,
    getAll
}