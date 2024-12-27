export default class Str {
    static isNotEmpty(str){
        if(typeof str === 'string')
            return str !== "" && str.trim() !== "";
        return false;
    }
}