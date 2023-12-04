const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, '../puzzle.input'), 'utf-8').split('\r\n');
//const input = fs.readFileSync(path.join(__dirname, '../test-puzzle.input'), 'utf-8').split('\r\n');

const getPointsFromScratchcard = (scratchcard) => {
    let numbers = scratchcard.replace(/Card .+: /g, '').split('|');
    let winningNumbers = numbers[0].split(' ').filter(n => n).map(n => parseInt(n)).sort((a, b) => a - b);
    let numbersOwned = numbers[1].split(' ').filter(n => n).map(n => parseInt(n)).sort((a, b) => a - b);

    let winningNumbersOwned = numbersOwned.filter(n => winningNumbers.includes(n));

    if (winningNumbersOwned.length > 0) {
        return Math.pow(2, winningNumbersOwned.length - 1);
    } else {
        return 0;
    }
};

const getSumOfPointsInScratchcards = (scratchcards) => {
    let sum = 0;

    for (let i = 0; i < scratchcards.length; i++) {
        let scratchcard = scratchcards[i];
        let points = getPointsFromScratchcard(scratchcard);
        sum += points;
    }

    return sum;
};

const sumOfPoints = getSumOfPointsInScratchcards(input);
console.log(sumOfPoints);