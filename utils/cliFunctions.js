import promptSync from "prompt-sync";

const prompt = promptSync();

export class CliFunctions {

  static EARLIEST_START_TIME = new Date('10-01-2022 17:00');
  static LATEST_END_TIME = new Date('10-02-2022 04:00');
  static TIME_REGEX = new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  static START_TIME_TO_BED_TIME_PAY = 12;
  static BED_TIME_TO_MIDNIGHT_PAY = 8;
  static MIDNIGHT_TO_END_TIME_PAY = 16;

  welcome() {
    console.log(`

Welcome to the babysitting payment calculation app!
        
This app will ask you 3 questions to determine what payment you should be receiving from the parents of the child you're watching

`);
  }

  createNewDate(timeString) {

    const timeSplit = timeString.split(':');

    let newDate; 

    if(timeSplit[0] >= '00' && timeSplit[0] <= '04') {
      newDate = new Date('10-02-2022');
    } else {
      
     newDate = new Date('10-01-2022');
    }

    newDate.setHours(timeSplit[0]);
    newDate.setMinutes(timeSplit[1]);

    return newDate;
  }

  promptUser(userPrompt) {
    const result = prompt(userPrompt);
    return result;
  }

  getStartTime(startTimeString) {

    if (CliFunctions.TIME_REGEX.test(startTimeString) === false) {
      throw Error('Invalid format. Please try again in the following format: 17:00');
    }

    const startTimeDate = this.createNewDate(startTimeString);

    if (`${startTimeDate.getHours()}:${startTimeDate.getMinutes()}` < `${CliFunctions.EARLIEST_START_TIME.getHours()}:${CliFunctions.EARLIEST_START_TIME.getMinutes()}`) {
      throw Error('You may not start work before 17:00. Please enter a time that is 17:00 or later');
    }

    return startTimeDate;
  }

  getBedTime(bedTimeString) {

    if (CliFunctions.TIME_REGEX.test(bedTimeString) == false) {
      throw Error('Invalid format. Please try again in the following format: 23:00');
    }

    const bedTimeDate = this.createNewDate(bedTimeString);

    if (`${bedTimeDate.getHours()}:${bedTimeDate.getMinutes()}` < `${CliFunctions.EARLIEST_START_TIME.getHours()}:${CliFunctions.EARLIEST_START_TIME.getMinutes()}` || 
    `${bedTimeDate.getHours()}:${bedTimeDate.getMinutes()}` > `${CliFunctions.LATEST_END_TIME.getHours()}:${CliFunctions.LATEST_END_TIME.getMinutes()}`) {

      throw Error('Bed time cannot be outside working hours.');
    }

    return bedTimeDate;
  }

  getEndTime(endTimeString) {

    if (CliFunctions.TIME_REGEX.test(endTimeString) == false) {
      throw Error('Invalid format. Please try again in the following format: 04:00');
    }

    const endTimeDate = this.createNewDate(endTimeString);

    if (`${endTimeDate.getHours()}:${endTimeDate.getMinutes()}` > `${CliFunctions.LATEST_END_TIME.getHours()}:${CliFunctions.LATEST_END_TIME.getMinutes()}`) {
      throw Error('You may not end work after 04:00. Please enter a time that is 04:00 or earlier');
    }

    return endTimeDate;
  }

 

  calculatePayment(startTimeDate, bedTimeDate, endTimeDate) {

   const midnightTest = this.createNewDate('00:00');
    let totalPayment = 0;

    totalPayment += Math.abs(Math.floor((((bedTimeDate.getTime() - startTimeDate.getTime()) / 1000) / (60 * 60)) * CliFunctions.START_TIME_TO_BED_TIME_PAY));
    console.log(Math.abs(Math.floor((((bedTimeDate.getTime() - startTimeDate.getTime()) / 1000) / (60 * 60)) * CliFunctions.START_TIME_TO_BED_TIME_PAY)));

    totalPayment += Math.abs(Math.floor((((bedTimeDate.getTime() - midnightTest.getTime()) / 1000) / (60 * 60)) * CliFunctions.BED_TIME_TO_MIDNIGHT_PAY));
    console.log(Math.abs(Math.floor(((( bedTimeDate.getTime() - midnightTest.getTime()) / 1000) / (60 * 60)) * CliFunctions.BED_TIME_TO_MIDNIGHT_PAY)));

    totalPayment += Math.abs(Math.floor((((endTimeDate.getTime() - midnightTest.getTime()) / 1000) / (60 * 60)) * CliFunctions.MIDNIGHT_TO_END_TIME_PAY));
    console.log(Math.abs(Math.floor((((endTimeDate.getTime() - midnightTest.getTime()) / 1000) / (60 * 60)) * CliFunctions.MIDNIGHT_TO_END_TIME_PAY)));


    console.log(`TOTAL PAYMENT: ${totalPayment}`)

    return totalPayment;
  }

}
