import { CliFunctions } from '../utils/cliFunctions.js'
import chai from 'chai'

const cliFunctions = new CliFunctions();

describe('Cli Functions', function () {

    describe('#getStartTime(startTimeString)', function () {

        it('should classify 07:00PM as a valid start time, and convert to military time', () => {
            const startTimeString = '07:00PM';
            chai.expect(cliFunctions.getStartTime(startTimeString)).to.equal(1900);
        });

        it('should throw an error if provided a start time with an invalid format', () => {
            const startTimeString = 'asd';

            chai.expect(function () { cliFunctions.getStartTime(startTimeString) }).to.throw(Error);
        })

        it('should throw an error if the provided time is before 05:00PM', () => {
            const startTimeString = '03:00PM';

            chai.expect(function () { cliFunctions.getStartTime(startTimeString) }).to.throw(Error);
        })
    });

    describe('#getEndTime(endTimeString)', () => {
        it('should classify 3:00AM as a valid end time', () => {
            const endTimeString = '03:00AM';
            chai.expect(cliFunctions.getEndTime(endTimeString)).to.equal(300);
        });

        it('should throw an error if provided an end time with an invalid format', () => {
            const endTimeString = 'sfasf';

            chai.expect(function () { cliFunctions.getEndTime(endTimeString) }).to.throw(Error);
        });

        it('should throw an error if the provided time is after 04:00AM and before or at 05:00PM', () => {
            const endTimeString = '05:00PM';

            chai.expect(function () { cliFunctions.getEndTime(endTimeString) }).to.throw(Error);
        });
    });

    describe('#getBedTime(bedTimeString)', () => {
        it('should classify 10:00PM as a valid bed time, and convert to military time', () => {
            const bedTimeString = '10:00PM';

            chai.expect(cliFunctions.getBedTime(bedTimeString)).to.equal(2200);
        });

        it('Should throw an error if the bed time is not between 05:00PM and 04:00AM', () => {

            const bedTimeString = '12:00PM';

            chai.expect(function () { cliFunctions.getEndTime(bedTimeString) }).to.throw(Error);
        });

    });

})