"use strict"

const { fileURLToPath } = require("url");

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */

function cloneObject(source) {
    let result = [];
    let sourceKeys = Object.keys(source[0]);
    
    for (let i in source) {
        var bucket = {};
        for (let j in sourceKeys) {
            bucket[sourceKeys[j]] = source[i][sourceKeys[j]];
        }
        result.push(bucket);
    }

    return result;
}
 
function query(collection) {
    let localCollection = cloneObject(collection);
    let collectionFields = Object.keys(localCollection[0]);
    let selectedRules = [], filteredRules = [];
    let modifRulesForSlecting = false;

    if (arguments.length == 1) return localCollection;

    for (let i in arguments) {
        let curArg = arguments[i];

        switch (curArg.operation) {
            case "select":
                if (modifRulesForSlecting) {
                    for (let j = selectedRules.length - 1; j >= 0; j--) {
                        if (!curArg.data.includes(selectedRules[j])) selectedRules.splice(j, 1);
                    }
                } else {
                    selectedRules = curArg.data;
                    modifRulesForSlecting = true;
                }
                break;

            case "filter":
                let curRule = filteredRules.find(rule => rule.prop == curArg.prop);
                
                if (curRule == undefined) {
                    filteredRules.push({prop: curArg.prop, data: curArg.data});
                    curRule = filteredRules[filteredRules.length - 1];
                    break;
                }

                for (let j = curRule.data.length - 1; j >= 0; j--) {
                    if (!curArg.data.includes(curRule.data[j])) curRule.data.splice(j, 1);
                }
                
                break;
            
            default: 
                break;
        }
    }

    for (let i = localCollection.length - 1; i >= 0; i--) {
        let elemOfColl = localCollection[i];
        for (let j = 0; j < filteredRules.length; j++) {
            let curRule = filteredRules[j];
            if (!curRule.data.includes(elemOfColl[curRule.prop])) {
                localCollection.splice(i, 1);
                break;
            }
        }
    }
    
    for (let i = localCollection.length - 1; i >= 0; i--) {        
        if (!modifRulesForSlecting) break;
        for (let j = 0; j < collectionFields.length; j++) {
            if (!selectedRules.includes(collectionFields[j])) {
                delete localCollection[i][collectionFields[j]];
                if (Object.keys(localCollection[i]).length == 0) {
                    localCollection.splice(i, 1);
                }
            }
        }
    }

    return localCollection;
}

/**
 * @params {String[]}
 */

function select() {
    return {operation: "select", data: Array.from(arguments)};
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */

function filterIn(property, values) {
    return {operation: "filter", prop: property, data: values};
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
