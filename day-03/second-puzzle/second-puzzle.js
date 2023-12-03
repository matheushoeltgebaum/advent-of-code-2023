const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, '../puzzle.input'), 'utf-8').split('\r\n');
//const input = fs.readFileSync(path.join(__dirname, '../test-puzzle.input'), 'utf-8').split('\r\n');

const processSchematic = (schematic) => {
    let gearsPositions = [];
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

                if (currentChar === '*') {
                    gearsPositions.push({ x: j, y: i });
                }
            }
        }

        if (currentNumber) {
            numbersPositions.push({ x1: currentLine.length - currentNumber.length, x2: currentLine.length - 1, y: i, number: parseInt(currentNumber) });
        }
    }

    return { gearsPositions, numbersPositions };
};

const getGearsRatios = (gearsPositions, numbersPositions) => {
    let gearRatios = [];
    for (let i = 0; i < gearsPositions.length; i++) {
        let gearPosition = gearsPositions[i];
        let adjacentsUpDownNumbers = numbersPositions.filter(numPos => 
            numPos.x1 <= gearPosition.x && gearPosition.x <= numPos.x2 && 
            (numPos.y + 1 === gearPosition.y || numPos.y - 1 === gearPosition.y));

        let adjacentsDiagonalsNumbers = numbersPositions.filter(numPos => 
            (numPos.x1 - 1 === gearPosition.x || gearPosition.x - 1 === numPos.x2) &&
            (numPos.y + 1 === gearPosition.y || numPos.y - 1 === gearPosition.y));

        let adjacentsSameLineNumbers = numbersPositions.filter(numPos => 
            (numPos.x1 - 1 === gearPosition.x || gearPosition.x - 1 === numPos.x2) && 
            numPos.y === gearPosition.y);

        let adjacents = adjacentsUpDownNumbers.concat(adjacentsDiagonalsNumbers, adjacentsSameLineNumbers).map(numPos => numPos.number);
        if (adjacents.length === 2) {
            gearRatios.push(adjacents[0] * adjacents[1]);
        }
    }

    return gearRatios;
};

const getSumOfPartNumbers = (schematic) => {
    const {gearsPositions, numbersPositions} = processSchematic(schematic);
    const gearRatios = getGearsRatios(gearsPositions, numbersPositions);
    return gearRatios.reduce((acc, val) => acc + val);
};

const sumOfPartNumbers = getSumOfPartNumbers(input);
console.log(sumOfPartNumbers);