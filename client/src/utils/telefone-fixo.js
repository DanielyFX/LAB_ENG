import Key from "./key";
import Str from "./str";

export default class TelefoneFixo {

    static #strictMask = /^\+?\d{0,3}\(?\d{2}\)?\d{4}-?\d{4}$/;
    static #incompleteMask = /^\+?\d{0,3}\(?\d{0,2}\)?\d{0,4}-?\d{0,3}$/;
    static #validFormatKeysMask = /[\d()+]/;

    static get maxLength () { return 17; }
    static get minLength () { return 10; }
    static get mask() { return "(00)0000-0000"; }

    static isFormatValid(telefone){
        return TelefoneFixo.#strictMask.test(telefone);
    }

    static isValidKey(key){
        return TelefoneFixo.#validFormatKeysMask.test(key);
    }

    static getNextFormatKey(telefone){
        if(telefone === "")
            return "(";
        else if(/^\(\d\d$/.test(telefone))
            return ")";
        else if(/^\(?\d{2}\)?\d{4}$/.test(telefone))
            return "-";
        else
            return "";
    }

    static hasNextKey(telefone){
        return TelefoneFixo.#incompleteMask.test(telefone);
    }

    static getOnlyDigits(telefone){
        return telefone.replaceAll("+", "")
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .replaceAll("-", "");
    }

    static getFormated(telefone){
        if(TelefoneFixo.isFormatValid(telefone))
            return `(${telefone.substr(0,2)})${telefone.substr(2,4)}-${telefone.substr(6,4)}`;
        return telefone;
    }

    static handleKeyDown(event){
        try{
            if(Key.isControl(event.key)) return;
    
            if(!TelefoneFixo.isValidKey(event.key)){
                event.preventDefault();
            }else if(!TelefoneFixo.hasNextKey(event.target.value)){
                event.preventDefault();
            }else{
                event.target.value += TelefoneFixo.getNextFormatKey(event.target.value);
            }
        }catch(error){
            console.error(`TelefoneFixo -> Erro handling keyDown event: ${error.message}`);
        }
    }

    static handleOnChange(telefone, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(telefone)){
                errorMsgSetter("Obrigatório!");
            }
            else if(TelefoneFixo.hasNextKey(telefone)){
                errorMsgSetter("Incompleto!");
            }else{
                errorMsgSetter("");
            }
            valueSetter(telefone);
        }catch(error){
            console.error(`TelefoneFixo -> Erro handling onChange event: ${error.message}`);
        }
    }
}