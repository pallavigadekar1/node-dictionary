
const endPoints = require('./Endpoints');


const formArray = (words) => {
    let arr = []
    words.forEach(element => {
        arr.push(element.text)
    });
    return arr;
}

function defn(word) {
    endPoints.makeHttpRequest('definitions', word).then(res => {
        let result = formArray(res.data);
        console.log('The list of definitions :');
        console.log(result);
    }).catch(err => {
        console.log('Given word not found in dictionary!')
    })
    return ;
}
function synonym(word) {
    endPoints.makeHttpRequest('relatedWords', word).then(res => {
        if(res.data.length>1)
        {
            console.log('The list of synonyms :');
            console.log(res.data[1].words);
        }
        else{
            console.log('The list of synonyms :');
            console.log(res.data[0].words);
        }
    }).catch(err => {
        console.log('Given word not found in dictionary!')
    })
    return;
}
function antonym(word) {
    endPoints.makeHttpRequest('relatedWords', word).then(res => {
        if (res.data.length>1) {
            console.log('The list of antonyms :');
            console.log(res.data[0].words);
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
    endPoints.makeHttpRequest('examples', word).then(res => {
        let result = formArray(res.data.examples);
        console.log('The list of example usage of word :');
        console.log(result);
    }).catch(err => {
        console.log('Given word not found in dictionary!')
    })
    return;
}

function  getAll(word) {

    defn(word);
    synonym(word);
    antonym(word);
    example(word);
}

module.exports={
        defn,
        synonym,
        antonym,
        example,
        getAll
}