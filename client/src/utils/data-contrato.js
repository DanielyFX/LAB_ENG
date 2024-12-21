import Str from "./str";
import Data from './data';

export default class DataContrato extends Data {

    static isValid(date){
        if(!super.isValid(date)) return false;
        if(typeof date === 'string')
            return Date.parse(date) <= Date.now();
        if(date instanceof Date)
            return date <= Data.Today;
        return  false;
    }

    static handleOnChange(date, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(date)){
                errorMsgSetter("Obrigatória!");
            }else if(!DataContrato.isValid(date)){
                errorMsgSetter("Inválida!");
            }else{
                errorMsgSetter("");
            }
            valueSetter(date);
        }catch(error){
            console.error(`DataContrato -> Erro handling onChange event: ${error.message}`);
        }
    }
}

