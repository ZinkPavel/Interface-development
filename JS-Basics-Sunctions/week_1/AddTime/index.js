/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */

module.exports = function (hours, minutes, interval) {
    var amountMinutes = hours * 60 + minutes + interval;

    var newHours = Math.floor(amountMinutes / 60) % 24;
    var newMinutes = amountMinutes % 60;

    var strHours = Math.floor(newHours / 10).toString() + (newHours % 10).toString();
    var strMinutes = Math.floor(newMinutes / 10).toString() + (newMinutes % 10).toString();

    return strHours + ':' + strMinutes;
};
