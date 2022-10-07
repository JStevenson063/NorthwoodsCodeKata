import { CliFunctions } from '../utils/cliFunctions.js'
import chai, { expect } from 'chai'

const cliFunctions = new CliFunctions();

describe('Cli Functions', function () {

    describe('#getStartTime(startTimeString)', function () {

        it('should classify 17:32 as a valid start time', () => {
            const startTimeString = '17:32';
            
            const startTimeDate = cliFunctions.getStartTime(startTimeString);

            chai.expect(`${startTimeDate.getHours()}:${startTimeDate.getMinutes()}`).to.equal('17:32');
        });


        it('should throw an error if the provided start time is not in the specified format', () => {
            const startTimeString = '102012:24PM';

            chai.expect(function () { cliFunctions.getStartTime(startTimeString) }).to.throw(Error);
        })

        it('should throw an error if the provided time is before 17:00', () => {
            const startTimeString = '15:00';

            chai.expect(function () { cliFunctions.getStartTime(startTimeString) }).to.throw(Error);
        })
    });

    describe('#getBedTime(bedTimeString)', () => {

        it('should classify 22:18 as a valid bed time', () => {
            const bedTimeString = '22:18';

            const bedTimeDate = cliFunctions.getBedTime(bedTimeString);

            chai.expect(`${bedTimeDate.getHours()}:${bedTimeDate.getMinutes()}`).to.equal('22:18');
        });

        it('Should throw an error if the bed time is not between 17:00 and 04:00', () => {

            const bedTimeString = '10:15';

            chai.expect(function () { cliFunctions.getBedTime(bedTimeString) }).to.throw(Error);
        });

        it('should throw an error if the provided bed time is not in the specified format', () => {
            const bedTimeString = '120012:24PM';

            chai.expect(function () { cliFunctions.getBedTime(bedTimeString) }).to.throw(Error);
        })

    });

    describe('#getEndTime(endTimeString)', () => {

        it('should classify 02:39 as a valid end time', () => {
            const endTimeString = '02:39';

            const endTimeDate = cliFunctions.getEndTime(endTimeString);

            chai.expect(`${endTimeDate.getHours()}:${endTimeDate.getMinutes()}`).to.equal('2:39');
        });

        it('should throw an error if the provided end time is not in the specified format', () => {
            const endTimeString = '120012:24PM';

            chai.expect(function () { cliFunctions.getEndTime(endTimeString) }).to.throw(Error);
        })

        it('should throw an error if the provided time is after 04:00 and before or at 17:00', () => {
            const endTimeString = '04:30';

            chai.expect(function () { cliFunctions.getEndTime(endTimeString) }).to.throw(Error);
        });
    });

    describe('#calculatePayment(startTimeDate, bedTimeDate, endTimeDate)', () => {

        it('should give a payment amount of $100 (startTimeDate = 17:00, bedTimeDate = 20:00, endTimeDate = 02:00) ', () =>{
            const startTimeDate = cliFunctions.createNewDate('17:00');
            const bedTimeDate = cliFunctions.createNewDate('20:00');
            const endTimeDate = cliFunctions.createNewDate('02:00');

            const paymentTest = cliFunctions.calculatePayment(startTimeDate, bedTimeDate, endTimeDate);

            expect(paymentTest).to.equal(100);
        });

        it('should give a payment amount of $100 (startTimeDate = 20:00, bedTimeDate = 00:00, endTimeDate = 03:00) ', () =>{
            const startTimeDate = cliFunctions.createNewDate('20:00');
            const bedTimeDate = cliFunctions.createNewDate('00:00');
            const endTimeDate = cliFunctions.createNewDate('03:00');

            const paymentTest = cliFunctions.calculatePayment(startTimeDate, bedTimeDate, endTimeDate);

            expect(paymentTest).to.equal(96);
        });
    });


    describe('#createNewDate(timeString)', () => {

        it('should give a new date object with date 10-01-2022 when passed 17:00', () => {
            const timeString = '17:00';

            const dateTestObject = cliFunctions.createNewDate(timeString);

            chai.expect(dateTestObject.getDate()).to.equal(1);
        });

        it('should give a new date object with date 10-02-2022 when passed 02:30', () => {
            const timeString = '02:30';

            const dateTestObject = cliFunctions.createNewDate(timeString);

            chai.expect(dateTestObject.getDate()).to.equal(2);
        });

        it('should give a new date object with date 10-02-2022 when passed 00:00', () => {
            const timeString = '00:00';

            const dateTestObject = cliFunctions.createNewDate(timeString);

            chai.expect(dateTestObject.getDate()).to.equal(2);
        })
    })

})