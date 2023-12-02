const input = require('./input');

const regZero = new RegExp('zero', 'g');
const regOne = new RegExp('one', 'g');
const regTwo = new RegExp('two', 'g');
const regThree = new RegExp('three', 'g');
const regFour = new RegExp('four', 'g');
const regFive = new RegExp('five', 'g');
const regSix = new RegExp('six', 'g');
const regSeven = new RegExp('seven', 'g');
const regEight = new RegExp('eight', 'g');
const regNine = new RegExp('nine', 'g');

/*
letters can overlap EIGHThree is 83 SEVENine is 79
since no numbers overlap by more than 1 character, when replacing we keep the first and last letters, and replace the rest with the number
one
two
three
four
five
six
seven
eight
nine
*/

const replaceText = (str) => str
    .replace(regOne, 'o1e')
    .replace(regTwo, 't2o')
    .replace(regThree, 't3e')
    .replace(regFour, 'f4r')
    .replace(regFive, 'f5e')
    .replace(regSix, 's6x')
    .replace(regSeven, 's7n')
    .replace(regEight, 'e8t')
    .replace(regNine, 'n9e');

const parsedInput = replaceText(input.join(',')).split(',');

const filterLetters = (str) => str.toLowerCase().split('').filter((char) => {
    const asciiCode = char.charCodeAt();
    return asciiCode >= 48 && asciiCode <= 57;
});

const findNum = (arr) => Number(arr[0] + arr[arr.length - 1]);

let sum = 0;

for (let i = 0; i < parsedInput.length; i += 1) {
    const line = parsedInput[i];
    const filtered = filterLetters(line);
    const num = findNum(filtered);
    sum += num;
    console.log(i, input[i], line, num, sum);
}
// parsedInput.forEach((line) => {
//     const filtered = filterLetters(line);
//     const num = findNum(filtered);
//     sum += num;
//     console.log(line, num, sum);
// });

console.log(sum);
