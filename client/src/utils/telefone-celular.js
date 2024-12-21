import Key from "./key";
import Str from "./str";

export default class TelefoneCelular {

    static #strictMask = /^\+?\d{0,3}\(?\d{2}\)?\d{5}-?\d{4}$/;
    static #incompleteMask = /^\+?\d{0,3}\(?\d{0,2}\)?\d{0,5}-?\d{0,3}$/;
    static #validFormatKeysMask = /[\d()+]/;

    static get maxLength () { return 18; }
    static get minLength () { return 11; }
    static get mask() { return "(00)00000-0000"; }

    static isFormatValid(telefone){
        return TelefoneCelular.#strictMask.test(telefone);
    }

    static isValidKey(key){
        return TelefoneCelular.#validFormatKeysMask.test(key);
    }

    static getNextFormatKey(telefone){
        if(telefone === "")
            return "(";
        else if(/^\(\d\d$/.test(telefone))
            return ")";
        else if(/^\(?\d{2}\)?\d{5}$/.test(telefone))
            return "-";
        else
            return "";
    }

    static hasNextKey(telefone){
        return TelefoneCelular.#incompleteMask.test(telefone);
    }

    static getOnlyDigits(telefone){
        return telefone.replaceAll("+", "")
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .replaceAll("-", "");
    }

    static getFormated(telefone){
        if(TelefoneCelular.isFormatValid(telefone))
            return `(${telefone.substr(0,2)})${telefone.substr(2,5)}-${telefone.substr(7,4)}`;
        return telefone;
    }

    static handleKeyDown(event){
        try{
            if(Key.isControl(event.key)) return;
    
            if(!TelefoneCelular.isValidKey(event.key)){
                event.preventDefault();
            }else if(!TelefoneCelular.hasNextKey(event.target.value)){
                event.preventDefault();
            }else{
                event.target.value += TelefoneCelular.getNextFormatKey(event.target.value);
            }
        }catch(error){
            console.error(`TelefoneCelular -> Erro handling keyDown event: ${error.message}`);
        }
    }

    static handleOnChange(telefone, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(telefone)){
                errorMsgSetter("Obrigatório!");
            }
            else if(TelefoneCelular.hasNextKey(telefone)){
                errorMsgSetter("Incompleto!");
            }else{
                errorMsgSetter("");
            }
            valueSetter(telefone);
        }catch(error){
            console.error(`TelefoneCelular -> Erro handling onChange event: ${error.message}`);
        }
    }
}