const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, '../puzzle.input'), 'utf-8').split('\r\n');
//const input = fs.readFileSync(path.join(__dirname, '../test-puzzle.input'), 'utf-8').split('\r\n');

const getCountOfCopies = (numbersOwned, winningNumbers) => {
    return numbersOwned.filter(n => winningNumbers.includes(n)).length;
};

const processInput = (input) => {
    const scratchcards = [];

    for (let i = 0; i < input.length; i++) {
        let scratchcard = input[i];
        let numbers = scratchcard.replace(/Card .+: /g, '').split('|');
        let winningNumbers = numbers[0].split(' ').filter(n => n).map(n => parseInt(n)).sort((a, b) => a - b);
        let numbersOwned = numbers[1].split(' ').filter(n => n).map(n => parseInt(n)).sort((a, b) => a - b);

        scratchcards.push({ id: i, count: 1, winningNumbers, numbersOwned });
    }

    return scratchcards;
};

const processScratchcards = (scratchcards) => {
    for (let i = 0; i < scratchcards.length; i++) {
        let scratchcard = scratchcards[i];

        for (let j = 0; j < scratchcard.count; j++) {
            let copies = getCountOfCopies(scratchcard.numbersOwned, scratchcard.winningNumbers);
    
            for (let k = 0; k < copies; k++) {
                scratchcards[i + 1 + k].count++;
            }
        }

    }
};

const calculateScratchcardsTotal = (scratchcards) => {
    let total = 0;

    for (let i = 0; i < scratchcards.length; i++) {
        total += scratchcards[i].count;
    }

    return total;
};

const getTotalOfScratchcards = (input) => {
    let scratchcards = processInput(input);
    processScratchcards(scratchcards);
    const scratchcardsTotal = calculateScratchcardsTotal(scratchcards);
    return scratchcardsTotal;
};

const total = getTotalOfScratchcards(input);
console.log(total);