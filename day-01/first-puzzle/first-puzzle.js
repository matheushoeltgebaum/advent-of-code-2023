const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, '../puzzle.input'), 'utf-8').split('\r\n');
//const input = fs.readFileSync(path.join(__dirname, '../test-puzzle.input'), 'utf-8').split('\r\n');

const getNumber = (numbers) => {
    const firstDigit = numbers[0];
    const lastDigit = numbers[numbers.length - 1];

    return parseInt(firstDigit + lastDigit);
};

const getSumFromCalibrationDocument = (input) => {
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
        let currentValue = input[i];
        let numbers = '';

        for (let j = 0; j < currentValue.length; j++) {
            let char = currentValue[j];
            if (!isNaN(char)) {
                numbers += char;
            }
        }

        let number = getNumber(numbers);
        sum += parseInt(number);
    }

    return sum;
};

const sum = getSumFromCalibrationDocument(input);
console.log(sum);