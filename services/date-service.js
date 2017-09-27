import moment from 'moment'

const service = {
    formats: {
        SERVER_DATE: "YYYYMMDDHHmm",
        EVENT_DISPLAY_DATE_TIME: "dddd, Do MMMM | hh:mm a",
        EVENT_DISPLAY_DATE_FULL: "dddd, D MMM YYYY",
        SHORT_WEEKDAY_DATE: "ddd D"
    },

    /**Build a date moment object from date, and time objects
     * @param date {Date} 
     * @param time {Date}
     * @return {moment}
    */
    buildDateTime: function (date, time) {
        return moment([
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes()
        ]);
    },   
    
    /**
     * Returns moment with utc
     */
    buildDateTimeUtc: function (date, time, stateUtc) {
        return service.addUtcOffet(service.buildDateTime(date, time), stateUtc);
    },

    /**Add utc offset to a moment date
     * @param mDate {moment}
     * @param stateUtc {number}
     * @return {moment} 
     */
    addUtcOffet: function(mDate, stateUtc) {
        return mDate.utcOffset(stateUtc).add(-1 * stateUtc, "m");
    },

    /**Build a moment date from server date string format
     * @param value {string} - string date server format
     * @return {moment}
     */
    fromServerDate(value){
        return moment(value, service.formats.SERVER_DATE);
    },

    /**Creates the server datetime string from a moment date 
     * @param mDate {moment}
     * @return {string}
    */
    toServerDate(mDate){
        return mDate.format(service.formats.SERVER_DATE);
    }
}

export default service;