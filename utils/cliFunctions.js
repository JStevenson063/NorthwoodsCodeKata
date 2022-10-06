import promptSync from "prompt-sync";

const prompt = promptSync();

export class CliFunctions {

  static EARLIEST_START_TIME = 500;
  static LATEST_END_TIME = 400;
  static MILITARY_TIME_CONVERSION_PM = 1200;
  static TIME_REGEX = '([0-9][0-9]):([0-9][0-9])(P|A)M'

  welcome() {
    console.log(`

Welcome to the babysitting payment calculation app!
        
This app will ask you 3 questions to determine what payment you should be receiving from the parents of the child you're watching

`);
  }

  promptUser(userPrompt) {
    const result = prompt(userPrompt);
    return result;
  }

  getStartTime(startTimeString) {

    if (!startTimeString.match(CliFunctions.TIME_REGEX)) {
      throw Error('Invalid format. Please try again in the following format: 06:00PM');
    }

    let startTimeSplit = startTimeString.split(':').join('').toUpperCase();
    let startTimeActual = parseInt(startTimeSplit);

    if (Number.isNaN(startTimeActual)) {
      throw Error('Invalid format. Please try again in the following format: 06:00PM');
    }

    if (startTimeActual < CliFunctions.EARLIEST_START_TIME) {
      throw Error('You may not start work before 05:00PM. Please enter a time that is 05:00PM or later');
    }

    if (startTimeString.includes('PM')) {
      startTimeActual += CliFunctions.MILITARY_TIME_CONVERSION_PM;
    }
    return startTimeActual;
  }

  getEndTime(endTimeString) {

    if (!endTimeString.match(CliFunctions.TIME_REGEX)) {
      throw Error('Invalid format. Please try again in the following format: 04:00AM');
    }

    let endTimeSplit = endTimeString.split(':').join('').toUpperCase();
    let endTimeActual = parseInt(endTimeSplit);

    if (Number.isNaN(endTimeActual)) {
      throw Error('Invalid format. Please try again in the following format: 03:00AM');
    }

    if (endTimeActual > CliFunctions.LATEST_END_TIME) {
      throw Error('You may not end work after 4 AM. Please enter a time that is 04:00AM or earlier');
    }

    if (endTimeString.includes('PM')) {
      endTimeActual += CliFunctions.MILITARY_TIME_CONVERSION_PM;
    }
    return endTimeActual;
  }

  getBedTime(bedTimeString) {

    if (!bedTimeString.match(CliFunctions.TIME_REGEX)) {
      throw Error('Invalid format. Please try again in the following format: 11:00PM');
    }

    let bedTimeSplit = bedTimeString.split(':').join('').toUpperCase();
    let bedTimeActual = parseInt(bedTimeSplit);

    if (Number.isNaN(bedTimeActual)) {
      throw Error('Invalid format. Please try again in the following format: 11:30PM');
    }

    if (bedTimeActual < CliFunctions.EARLIEST_START_TIME && bedTimeActual > CliFunctions.LATEST_END_TIME) {
      throw Error('Bed time cannot be outside working hours.');
    }

    if (bedTimeString.includes('PM')) {
      bedTimeActual += CliFunctions.MILITARY_TIME_CONVERSION_PM;
    }

    return bedTimeActual;


  }
}
