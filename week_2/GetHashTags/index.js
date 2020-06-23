"use strict"

/**
 * @param {String} tweet
 * @returns {String[]}
 */

module.exports = function (tweet) {
    var result = [];
    
    result = tweet.split(' ');
   
    result = result.filter(function(word) {
        return word[0] == '#';
    });
    
    result.forEach(function(hashtag, i, result) {
        result[i] = hashtag.slice(1);
    });

    return result;
};
