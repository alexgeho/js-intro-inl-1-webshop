
/**
 * Formats date in the yyyy-mm-dd
 * @param {*} Date Date objekt
 * @returns string Date in the yyyy-mm-dd
 */
export function prettyDate(date) {


   return `${date.getFullYear()}-${padString (date.getMonth()+1)}-${padString(date.getDate())}`;
}


/**
 * Adds a zero to the beggining of a string
 * @param {*} number 
 * @returns string String padded with 0 in the beginning
 */
export function padString(number) {
    return String(number).padStart(2, '0');
}

export default prettyDate;