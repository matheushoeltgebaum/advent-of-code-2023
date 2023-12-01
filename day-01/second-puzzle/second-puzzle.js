const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, '../puzzle.input'), 'utf-8').split('\r\n');
//const input = fs.readFileSync(path.join(__dirname, '../test-puzzle.input'), 'utf-8').split('\r\n');

const isValidSpelledDigit = (spelledDigit) => {
    let validSpelledDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    for (let i = 0; i < validSpelledDigits.length; i++) {
        let currentDigit = validSpelledDigits[i];
        if (currentDigit.startsWith(spelledDigit)) {
            return true;
        }
    }

    return false;
};

const getSpelledDigit = (spell) => {
    let validSpelledDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    for (let i = 0; i < validSpelledDigits.length; i++) {
        let currentDigit = validSpelledDigits[i];
        if (currentDigit === spell) {
            return i + 1;
        }
    }

    return undefined;
};

const findNumbersInValue = (value) => {
    let numbers = '';
    let currentSpell = '';

    for (let i = 0; i < value.length; i++) {
        let char = value[i];

        if (!isNaN(char)) {
            numbers += char;
            currentSpell = '';
        } else {
            currentSpell += char;
            if (isValidSpelledDigit(currentSpell)) {
                let spelledDigit = getSpelledDigit(currentSpell);
                if (spelledDigit) {
                    numbers += spelledDigit;
                    currentSpell = currentSpell[currentSpell.length - 1];
                }
            } else {
                currentSpell = currentSpell.substring(1);
                if (isValidSpelledDigit(currentSpell)) {
                    let spelledDigit = getSpelledDigit(currentSpell);
                    if (spelledDigit) {
                        numbers += spelledDigit;
                        currentSpell = currentSpell[currentSpell.length - 1];
                    }
                } else {
                    currentSpell = '';
                }
            }
        }
    }

    return numbers;
};

const getNumber = (numbers) => {
    const firstDigit = numbers[0];
    const lastDigit = numbers[numbers.length - 1];

    return parseInt(firstDigit + lastDigit);
};

const getSumFromCalibrationDocument = (input) => {
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
        let currentValue = input[i];
        let numbers = findNumbersInValue(currentValue);
        let number = getNumber(numbers);
        sum += parseInt(number);
    }

    return sum;
};

const sum = getSumFromCalibrationDocument(input);
console.log(sum);