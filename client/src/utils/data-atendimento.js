import Str from "./str";
import Data from './data';

export default class DataPrevisaoAtendimento extends Data {

    static isValid(date){
        if(!super.isValid(date)) return false;

        if(typeof date === 'string')
            return Date.parse(date) >= Date.now();
        if(date instanceof Date)
            return date >= Data.Today;
        return  false;
    }
    
    static handleOnChange(date, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(date)){
                errorMsgSetter("Obrigatória!");
            }else if(!DataPrevisaoAtendimento.isValid(date)){
                errorMsgSetter("Inválida!");
            }else{
                errorMsgSetter("");
            }
            valueSetter(date);
        }catch(error){
            console.error(`DataPrevisaoAtendimento -> Erro handling onChange evenet: ${error.message}`);
        }
    }
}
