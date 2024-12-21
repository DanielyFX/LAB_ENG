export default class Data {
    static get Today(){
        return new Date();
    }

    static get TodayHTMLDatetimeLocalFormat() {
        return /\d{4}-\d\d-\d\dT\d\d:\d\d/.exec(Data.Today.toISOString())[0];
    }

    static get TodayHTMLDateFormat() {
        return /\d{4}-\d\d-\d\d/.exec(Data.Today.toISOString())[0];
    }

    static isValid(date){
        if(typeof date === 'string')
            return isNaN(Date.parse(date));
        if(date instanceof Date)
            return isNaN(date.valueOf());
        return false;
    }

    static getOnlyDateBRFormat(isoDate){
        const date = new Date(isoDate);
        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    }
}