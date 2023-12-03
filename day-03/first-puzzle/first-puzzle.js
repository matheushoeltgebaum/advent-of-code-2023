const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, '../puzzle.input'), 'utf-8').split('\r\n');
//const input = fs.readFileSync(path.join(__dirname, '../test-puzzle.input'), 'utf-8').split('\r\n');

const processSchematic = (schematic) => {
    let symbolsPositions = [];
    let numbersPositions = [];

    for (let i = 0; i < schematic.length; i++) {
        let currentLine = schematic[i];
        let currentNumber = '';

        for (let j = 0; j < currentLine.length; j++) {
            let currentChar = currentLine[j];
            if (!isNaN(currentChar)) {
                currentNumber += currentChar;
            } else {
                if (currentNumber) {
                    numbersPositions.push({ x1: j - currentNumber.length, x2: j - 1, y: i, number: parseInt(currentNumber) });
                    currentNumber = '';
                }

                if (currentChar !== '.') {
                    symbolsPositions.push({ x: j, y: i });
                }
            }
        }

        if (currentNumber) {
            numbersPositions.push({ x1: currentLine.length - currentNumber.length, x2: currentLine.length - 1, y: i, number: parseInt(currentNumber) });
        }
    }

    return { symbolsPositions, numbersPositions };
};

const getNumbersAdjacentToSymbols = (symbolsPositions, numbersPositions) => {
    let numbers = [];
    for (let i = 0; i < symbolsPositions.length; i++) {
        let currentSymbolPosition = symbolsPositions[i];
        let adjacentsUpDownNumbers = numbersPositions.filter(numPos => 
            numPos.x1 <= currentSymbolPosition.x && currentSymbolPosition.x <= numPos.x2 && 
            (numPos.y + 1 === currentSymbolPosition.y || numPos.y - 1 === currentSymbolPosition.y));

        let adjacentsDiagonalsNumbers = numbersPositions.filter(numPos => 
            (numPos.x1 - 1 === currentSymbolPosition.x || currentSymbolPosition.x - 1 === numPos.x2) &&
            (numPos.y + 1 === currentSymbolPosition.y || numPos.y - 1 === currentSymbolPosition.y));

        let adjacentsSameLineNumbers = numbersPositions.filter(numPos => 
            (numPos.x1 - 1 === currentSymbolPosition.x || currentSymbolPosition.x - 1 === numPos.x2) && 
            numPos.y === currentSymbolPosition.y);

        let adjacents = adjacentsUpDownNumbers.concat(adjacentsDiagonalsNumbers, adjacentsSameLineNumbers).map(numPos => numPos.number);
        numbers = numbers.concat(adjacents);
    }

    return numbers;
};

const getSumOfPartNumbers = (schematic) => {
    const {symbolsPositions, numbersPositions} = processSchematic(schematic);
    const numbers = getNumbersAdjacentToSymbols(symbolsPositions, numbersPositions);
    return numbers.reduce((acc, val) => acc + val);
};

const sumOfPartNumbers = getSumOfPartNumbers(input);
console.log(sumOfPartNumbers);