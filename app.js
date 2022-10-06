#!/usr/bin/env node
import { CliFunctions } from './utils/cliFunctions.js'


const cliFunctions = new CliFunctions();



cliFunctions.welcome();

let startTimeActual = 0;
let endTimeActual = 0;
let bedTimeActual = 0;


let startTimeString = cliFunctions.promptUser('What time did you start work? (Format: 06:00PM) ');
try {
    startTimeActual = cliFunctions.getStartTime(startTimeString);
} catch (e) {
    console.log(e.message);
    let startTimeStringRetry = cliFunctions.promptUser('What time did you start work? (Format: 06:00PM) ');
    startTimeActual = cliFunctions.getStartTime(startTimeStringRetry);
}

let endTimeString = cliFunctions.promptUser('What time did you end work? (Format: 03:00AM) ');
try {
    endTimeActual = cliFunctions.getEndTime(endTimeString);
} catch (e) {
    console.log(e.message);
    let endTimeStringRetry = cliFunctions.promptUser('What time did you start work? (Format: 06:00PM) ');
    endTimeActual = cliFunctions.getStartTime(endTimeStringRetry);
}

let bedTimeString = cliFunctions.promptUser('What time did the child go to bed? (Format: 11:00PM) ');
try {
    bedTimeActual = cliFunctions.getBedTime(bedTimeString);
} catch (e) {
    console.log(e.message);
    let bedTimeStringRetry = cliFunctions.promptUser('What time did the child go to bed? (Format: 11:00PM) ');
    bedTimeActual = cliFunctions.getStartTime(bedTimeStringRetry);
}

console.log(`START TIME ACTUAL: ${startTimeActual}`);
console.log(`END TIME ACTUAL: ${endTimeActual}`);
console.log(`BED TIME ACTUAL: ${bedTimeActual}`);

