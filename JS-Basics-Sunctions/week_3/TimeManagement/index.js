"use strict"

const { Writable } = require("stream");

/**
 * @param {String} date
 * @returns {Object}
 */

module.exports = function (date) {
    date = new Date(Date.parse(date));

    
    Object.defineProperty(date, "update", { // hide
        value: function(num, field, sign) {
            if (num < 0) throw new TypeError();
            
            switch (field) {
                case "years": 
                    date.setFullYear(this.getFullYear() + Number.parseInt(sign + num));
                    break;
                
                case "months": 
                    this.setMonth(this.getMonth() + Number.parseInt(sign + num));
                    break;
                
                case "days": 
                    this.setDate(this.getDate() + Number.parseInt(sign + num));
                    break;
                
                case "hours": 
                    this.setHours(this.getHours() + Number.parseInt(sign + num));
                    break;
                
                case "minutes": 
                    this.setMinutes(this.getMinutes() + Number.parseInt(sign + num));
                    break;
                
                case "seconds": 
                    this.setSeconds(this.getSeconds() + Number.parseInt(sign + num));
                    break;
                
                default:
                    throw new TypeError();
            }
                
            let strDate = '' + this.getFullYear() + '-' + Math.floor((this.getMonth() + 1) / 10) + ((this.getMonth() + 1) % 10) + '-' + Math.floor(this.getDate() / 10) + (this.getDate() % 10);
            let strTime = '' + Math.floor(this.getHours() / 10) + (this.getHours() % 10) + ':' + Math.floor(this.getMinutes() / 10) + (this.getMinutes() % 10);
            
            this.value = strDate + ' ' + strTime;
        }
    });

    Object.defineProperty(date, "value", { // call update()
        value: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
        writable: true,
    });
        
    Object.defineProperty(date, "add", {
        value: function(num, field) {
            this.update(num, field, '+');
            return date;
        }                
    });

    Object.defineProperty(date, "subtract", {
        value: function(num, field) {
            this.update(num, field, '-');
            return date;
        }
    });

    return date;
};