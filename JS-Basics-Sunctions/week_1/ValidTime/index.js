/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */

module.exports = function (hours, minutes) {
    var isValid = false;
    
    if (hours >= 0 && hours <= 23) {
        if (minutes >= 0 && minutes <= 59) {
            isValid = true;
        }
    }

    return isValid;
};
