"use strict"

/**
 * @param {String[]} hashtags
 * @returns {String}
 */

module.exports = function (hashtags) {
    var result = [];
    var setOfHashtags = new Set();
    
    hashtags.forEach(function(hashtag) {
        hashtag = hashtag.toLowerCase();

        if (!setOfHashtags.has(hashtag)) {
            setOfHashtags.add(hashtag);
            result.push(hashtag);
        }
    });
    
    return result.join(', ');
};
