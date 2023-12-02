const input = require('./input');

const filterLetters = (str) => str.split('').filter((char) => {
    const asciiCode = char.charCodeAt();
    return asciiCode >= 48 && asciiCode <= 57;
});

const findNum = (arr) => Number(arr[0] + arr[arr.length - 1]);

let sum = 0;

input.forEach((line) => {
    const filtered = filterLetters(line);
    const num = findNum(filtered);
    sum += num;
});

console.log(sum);
