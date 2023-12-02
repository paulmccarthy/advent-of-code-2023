const input = require('./input');

const parseGameId = (str) => {
    const parts = str.split(':'); // split id from games, gives "Game NN" in part[0], and game data on part[1]
    const gameId = Number(parts[0].split(' ')[1]); // part[0][1]
    const picks = parts[1].split(';'); // multiple games per line

    return {
        gameId,
        picks
    };
};

const parseColours = (pick, gameId) => {
    let red = 0;
    let green = 0;
    let blue = 0;

    // each variable split by commas
    pick.split(',').forEach((colour) => {
        const parts = colour.trim().split(' '); // number in part[0], colour in part[1]

        switch (parts[1]) {
            case 'red':
                red += Number(parts[0]);
                break;
            case 'green':
                green += Number(parts[0]);
                break;
            case 'blue':
                blue += Number(parts[0]);
                break;
            default:
                throw new Error(`Unknown colour in game ${gameId}: ${parts[1]}`);
        }
    });

    return {
        red,
        green,
        blue
    };
};

const max = (arr) => {
    arr.sort((a, b) => b - a);
    return arr[0];
};

let sum = 0;

input.forEach((game) => {
    const { gameId, picks } = parseGameId(game);

    const red = [];
    const green = [];
    const blue = [];

    picks.forEach((pick) => {
        const { red: redCount, green: greenCount, blue: blueCount } = parseColours(pick, gameId);

        red.push(redCount);
        green.push(greenCount);
        blue.push(blueCount);
    });

    const maxRed = max(red);
    const maxGreen = max(green);
    const maxBlue = max(blue);

    const power = maxRed * maxGreen * maxBlue;
    sum += power;

});

console.log(sum);
