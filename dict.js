const endPoints = require('./Endpoints'),
    readline = require('readline'),
    dictionary = require('./dictionary_functions'),
    args = process.argv;

switch (args[1]) {
    case 'def':
        dictionary.defn(args[2]);
        break;
    case 'syn':
        dictionary.synonym(args[2]);
        break;
    case 'ant':
        dictionary.antonym(args[2]);
        break;
    case 'ex':
        dictionary.example(args[2]);
        break;
    case 'play':
        let readPrompt = readline.createInterface(process.stdin, process.stdout);
        prompt = (inutText) => {
            return new Promise((resolve, reject) => {
                readPrompt.question(inputText, resolve);
            });
        }
        let word = endPoints.getRandomWord();
        defs = dictionary.defn(word);
        synonyms = dictionary.synonym(word);
        antonyms = dictionary.antonym(word);
        let input = prompt('Guess the word')
        if (input === word) {
            console.log('CORRECT');
        }
        else {
            let exit = 0;
            while (true) {
                if (exit === 1) {
                    break;
                } else {
                    console.log("Enter 1 to try again, 2 for hint, 3 to quit");
                    let choice = prompt('');
                    let wordinput;
                    choice = Number(choice);
                    switch (choice) {
                        case 1:
                            console.log(" Try again ");
                            wordinput = prompt("Enter word\n");
                            if (word === wordinput) {
                                console.log("Correct word!!")
                                flag = 1;
                            } else {
                                console.log("incorrect guess.")
                            }
                            break;
                        case 2:
                            console.log('options for hint')
                            let hint = prompt('for hint enter 1 for julmbled word,2 for definition,3 for synonym,4 for antonym')
                            switch (hint) {
                                case 1:
                                    console.log('jumbled word : \n', word.split('').sort(function () { return 0.5 - Math.random() }).join(''))
                                    wordinput = promt("Enter Your Word again\n");
                                    if (word === wordinput) {
                                        console.log("Correct!")
                                        exit = 1;
                                    } else {
                                        console.log("That's incorrect.")
                                    }
                                    break;
                                case 2:
                                    console.log('definitions : ', defs)
                                    wordinput = promt("Enter Your Word again\n");
                                    if (word === wordinput) {
                                        console.log("Correct!")
                                        exit = 1;
                                    } else {
                                        console.log("That's incorrect.")
                                    }
                                    break;
                                case 3:
                                    console.log('synonyms : ', synonyms)
                                    wordinput = promt("Enter Your Word again\n");
                                    if (word === wordinput) {
                                        console.log("Correct!")
                                        exit = 1;
                                    } else {
                                        console.log("That's incorrect.")
                                    }
                                    break;
                                case 4:
                                    console.log('antonyms : ', antonyms)
                                    wordinput = promt("Enter Your Word again\n");
                                    if (word === wordinput) {
                                        console.log("Correct!")
                                        exit = 1;
                                    } else {
                                        console.log("That's incorrect.")
                                    }
                                    break;


                            }
                            break;
                        case 3:
                            exit = 1
                            console.log('bye!')
                            break;
                    }
                }
            }
        }
        break;
    default:
        if (ars[1]) {
            dictionary.getAll(args[1])
        }
        else {
            word = endPoints.getRandomWord()
            dictionary.getAll(word);
        }
        break;


}
