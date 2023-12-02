const input = require('./input');

const RED = 12;
const GREEN = 13;
const BLUE = 14;

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

        switch(parts[1]) {
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

let sum = 0;

input.forEach((game) => {
    const { gameId, picks } = parseGameId(game);

    let isPossible = true;

    picks.forEach((pick) => {
        const { red, green, blue } = parseColours(pick, gameId);

        // only one of the picks within in a game needs to be invalid, to invalidate the whole game
        if (red > RED || green > GREEN || blue > BLUE) {
            isPossible = false;
        }
    });

    if (isPossible) {
        sum += gameId;
    }
});

console.log(sum);
