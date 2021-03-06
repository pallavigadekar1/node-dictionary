process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const endPoints = require('./Endpoints'),
    readline = require('readline'),
    dictionary = require('./dictionary_functions'),
    args = process.argv;

switch (args[2]) {
    case 'def':
        dictionary.defn(args[3]);
        break;
    case 'syn':
        dictionary.synonym(args[3]);
        break;
    case 'ant':
        dictionary.antonym(args[3]);
        break;
    case 'ex':
        dictionary.example(args[3]);
        break;
    case 'play':
        let readPrompt = readline.createInterface(process.stdin, process.stdout);
        let prompt = (inputText) => {
            return new Promise( (resolve, reject) => {
                readPrompt.question(inputText, resolve);
            });
        }
        endPoints.getRandomWord().then(async (word) => {
           
            defs = await dictionary.defn(word);
            synonyms =await dictionary.synonym(word);
            antonyms = dictionary.antonym(word);
            console.log('definition of word ', defs);
            console.log('synonyms are -->', synonyms);
            let input = await prompt('Guess the word')
            if (input === word) {
                console.log('CORRECT');
            }
            else {
                let exit = 0;
                while (true) {
                    if (exit === 1) {
                        break;
                    } else {
                        //  console.log("Enter 1 to try again, 2 for hint, 3 to quit");
                        let choice =await  prompt("Enter 1 to try again, 2 for hint, 3 to quit");
                        let wordinput;
                        choice = Number(choice);
                        switch (choice) {
                            case 1:
                                console.log(" Try again ");
                                wordinput = await prompt("Enter word\n");
                                if (word === wordinput) {
                                    console.log("Correct word!!")
                                    exit = 1;
                                } else {
                                    console.log("incorrect guess.")
                                }
                                break;
                            case 2:
                                console.log('options for hint')
                                let hint = await prompt('for hint enter 1 for julmbled word,2 for definition,3 for synonym,4 for antonym')
                                switch (hint) {
                                    case 1:
                                        console.log('jumbled word : \n', word.split('').sort(function () { return 0.5 - Math.random() }).join(''))
                                        wordinput = await promt("Enter Your Word again\n");
                                        if (word === wordinput) {
                                            console.log("Correct!")
                                            exit = 1;
                                        } else {
                                            console.log("That's incorrect.")
                                        }
                                        break;
                                    case 2:
                                        console.log('definitions : ', defs)
                                        wordinput = await promt("Enter Your Word again\n");
                                        if (word === wordinput) {
                                            console.log("Correct!")
                                            exit = 1;
                                        } else {
                                            console.log("That's incorrect.")
                                        }
                                        break;
                                    case 3:
                                        console.log('synonyms : ', synonyms)
                                        wordinput = await promt("Enter Your Word again\n");
                                        if (word === wordinput) {
                                            console.log("Correct!")
                                            exit = 1;
                                        } else {
                                            console.log("That's incorrect.")
                                        }
                                        break;
                                    case 4:
                                        console.log('antonyms : ', antonyms)
                                        wordinput = await promt("Enter Your Word again\n");
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
                        break;
                    }
                }
            }
            process.exit()
        }).catch(err => {
            console.log('Error in playing game');
        })

        break;
    default:
        if (args[2]) {
            dictionary.getAll(args[2])
        }
        else {
            endPoints.getRandomWord().then(word => {
                console.log('word generated-->', word);
                dictionary.getAll(word);
            }).catch(err => {
                console.log(err);
            })

        }
        break;


}
