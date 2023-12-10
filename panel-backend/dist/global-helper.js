"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = exports.getCurrDay = exports.timeStampGen = void 0;
function timeStampGen() {
    // returns time stamp for Bulgarian time zone - Sofia 
    // mostly used in error logging
    return new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' });
}
exports.timeStampGen = timeStampGen;
function getCurrDay() {
    // returns curr day in the following format "dd/mm/yyyy г" per Sofia
    // mostly used in client components
    return new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' }).slice(0, 11);
}
exports.getCurrDay = getCurrDay;
function validateData(schema, data) {
    try {
        return { isValid: true, data: schema.validateSync(data, { abortEarly: false }) };
    }
    catch (error) {
        return { isValid: false, error };
    }
}
exports.validateData = validateData;
