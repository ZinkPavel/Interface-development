"use strict"

// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */

module.exports = function (command) {
    var commandParts = command.split(' ');

    switch (commandParts[0]) {
        case "ADD":
            var newNumbers = commandParts[2].split(',');
            
            if (phoneBook.hasOwnProperty(commandParts[1])) phoneBook[commandParts[1]] = phoneBook[commandParts[1]].concat(newNumbers);
            else phoneBook[commandParts[1]] = newNumbers;
            
            break;

        case "SHOW":
            var users = Object.getOwnPropertyNames(phoneBook);
            var result = [];

            for (var i = 0; i < users.length; i++) {
                if (phoneBook[users[i]].length > 0) {
                    var infoAboutUser = users[i] + ": " + phoneBook[users[i]].join(", ");
                    result.push(infoAboutUser);
                }
            }

            result.sort();
            return result;

        case "REMOVE_PHONE":
            var users = Object.getOwnPropertyNames(phoneBook);
            var success = false;
            
            for (var i = 0; i < users.length; i++) {
                var userNumbers = phoneBook[users[i]];
                var foundedIndex = userNumbers.findIndex(number => number == commandParts[1]);

                if (foundedIndex != -1) {
                    userNumbers.splice(foundedIndex, 1);
                    success = true;
                }
            }

            return success;
            
        default:
            break;
    }
};
