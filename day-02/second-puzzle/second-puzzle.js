const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, '../puzzle.input'), 'utf-8').split('\r\n');
//const input = fs.readFileSync(path.join(__dirname, '../test-puzzle.input'), 'utf-8').split('\r\n');

const getRedCubes = (cubesSubset) => {
    const redCubesRegex = /(\d+) red/;
    const groups = cubesSubset.match(redCubesRegex);
    if (groups) {
        return parseInt(groups[1]);
    } else {
        return 0;
    }
};

const getGreenCubes = (cubesSubset) => {
    const greenCubesRegex = /(\d+) green/;
    const groups = cubesSubset.match(greenCubesRegex);
    if (groups) {
        return parseInt(groups[1]);
    } else {
        return 0;
    }
};

const getBlueCubes = (cubesSubset) => {
    const blueCubesRegex = /(\d+) blue/;
    const groups = cubesSubset.match(blueCubesRegex);
    if (groups) {
        return parseInt(groups[1]);
    } else {
        return 0;
    }
};

const getGamePower = (cubesInfo) => {
    const cubesSubsets = cubesInfo.split(';');
    let maxRedCubes = 0;
    let maxGreenCubes = 0;
    let maxBlueCubes = 0;

    for (let i = 0; i < cubesSubsets.length; i++) {
        let currentSubset = cubesSubsets[i];
        let redCubes = getRedCubes(currentSubset);
        let greenCubes = getGreenCubes(currentSubset);
        let blueCubes = getBlueCubes(currentSubset);

        if (redCubes > maxRedCubes) {
            maxRedCubes = redCubes;
        }

        if (greenCubes > maxGreenCubes) {
            maxGreenCubes = greenCubes;
        }

        if (blueCubes > maxBlueCubes) {
            maxBlueCubes = blueCubes;
        }
    }

    return maxRedCubes * maxGreenCubes * maxBlueCubes;
};

const getSumOfGamesPower = (games) => {
    let sum = 0;

    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        let gameInfo = game.split(':');
        let gamePower = getGamePower(gameInfo[1]);
        sum += gamePower;
    }

    return sum;
};

const sumOfGamesPower = getSumOfGamesPower(input);
console.log(sumOfGamesPower);