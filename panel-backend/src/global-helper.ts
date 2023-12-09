// Desc: helper functions for general use
import * as Yup from 'yup';

export function timeStampGen () {
    // returns time stamp for Bulgarian time zone - Sofia 
    // mostly used in error logging
    return new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' })
}

export function getCurrDay () {
    // returns curr day in the following format "dd/mm/yyyy г" per Sofia
    // mostly used in client components
    return new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' }).slice(0, 11)
}

export function validateData (schema: Yup.Schema, data: { username: string, password: string, passwordConfirm: string, email: string}) {
    try {
        return { isValid: true, data: schema.validateSync(data, { abortEarly: false }) };
    } catch (error) {
        return { isValid: false, error };
    }
 }
 
