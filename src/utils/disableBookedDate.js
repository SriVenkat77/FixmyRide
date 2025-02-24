import formatDate from './dateFormat';

function disableBookedDate(bookingIdArray = []) {
    return bookingIdArray.map(({ startDate, endDate }) => ({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
    }));
}

export default disableBookedDate;
