const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, '../puzzle.input'), 'utf-8').split('\r\n');
//const input = fs.readFileSync(path.join(__dirname, '../test-puzzle.input'), 'utf-8').split('\r\n');

const getGameId = (gameInfo) => {
    const gameIdRegex = /Game (\d+)/;
    const groups = gameInfo.match(gameIdRegex);
    return parseInt(groups[1]);
};

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

const isPossibleGame = (cubesInfo) => {
    const cubesSubsets = cubesInfo.split(';');
    const maxRedCubes = 12;
    const maxGreenCubes = 13;
    const maxBlueCubes = 14;

    for (let i = 0; i < cubesSubsets.length; i++) {
        let currentSubset = cubesSubsets[i];
        let redCubes = getRedCubes(currentSubset);
        let greenCubes = getGreenCubes(currentSubset);
        let blueCubes = getBlueCubes(currentSubset);

        if (redCubes > maxRedCubes || greenCubes > maxGreenCubes || blueCubes > maxBlueCubes) {
            return false;
        }
    }

    return true;
};

const getSumOfGameIds = (games) => {
    let sum = 0;

    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        let gameInfo = game.split(':');
        let gameId = getGameId(gameInfo[0]);
        let isValidGame = isPossibleGame(gameInfo[1]);

        if (isValidGame) {
            sum += gameId;
        }
    }

    return sum;
};

const sumOfGameIds = getSumOfGameIds(input);
console.log(sumOfGameIds);