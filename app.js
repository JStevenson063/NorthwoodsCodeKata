#!/usr/bin/env node
import { CliFunctions } from './utils/cliFunctions.js'


const cliFunctions = new CliFunctions();



cliFunctions.welcome();

let startTimeDate;
let bedTimeDate;
let endTimeDate;

let startTimeConfirmed = false;
while (startTimeConfirmed == false) {

    let startTimeString = cliFunctions.promptUser('What time did you start work? (Military Time. Example: 17:00) ');
    try {
        startTimeDate = cliFunctions.getStartTime(startTimeString);
        startTimeConfirmed = true;

    } catch (e) {
        console.log(e.message);
    }
}

let bedTimeConfirmed = false;
while (bedTimeConfirmed == false) {
    let bedTimeString = cliFunctions.promptUser('What time did the child go to bed? (Military Time. Example: 23:00) ');
    try {
        bedTimeDate = cliFunctions.getBedTime(bedTimeString);
        bedTimeConfirmed = true;
    } catch (e) {
        console.log(e.message);
    }
}

let endTimeConfirmed = false;
while (endTimeConfirmed == false) {

    let endTimeString = cliFunctions.promptUser('What time did you end work? (Military Time. Example: 03:00) ');
    try {
        endTimeDate = cliFunctions.getEndTime(endTimeString);
        endTimeConfirmed = true;
    } catch (e) {
        console.log(e.message);
    }
}

cliFunctions.calculatePayment(startTimeDate, bedTimeDate, endTimeDate);