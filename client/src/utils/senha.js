import Key from "./key";
import Str from "./str";

export default class Senha {
    static #senhaReg = /[\d\w _@\-!?#]{6,}/;
    static #senhaKeys = /[\d\w _@\-!?#]/i;
    static #lowerCaseLetters = /[a-z]+/;
    static #upperCaseLetters = /[A-Z]+/;
    static #numbers = /\d+/;
    static #specialCharacters = /[_@\-!?#]+/;

    static isValid(senha){
        return Senha.#senhaReg.test(senha);
    }

    static isValidKey(key){
        return Senha.#senhaKeys.test(key);
    }

    static hasLowerCaseLetters(senha){
        return Senha.#lowerCaseLetters.test(senha);
    }

    static hasUpperCaseLetters(senha){
        return Senha.#upperCaseLetters.test(senha);
    }

    static hasNumbers(senha){
        return Senha.#numbers.test(senha);
    }

    static hasSpecialCharacters(senha){
        return Senha.#specialCharacters.test(senha);
    }


    static handleKeyDown(event){
        try{
            if(Key.isControl(event.key)) return;
    
            if(!Senha.isValidKey(event.key)){
                event.preventDefault();
            }
        }catch(error){
            console.error(`Senha -> Erro handling keyDown event: ${error.message}`);
        }
    }

    static handleOnChange(senha, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(senha)){
                errorMsgSetter("Obrigatório!");
            }
            else if(!Senha.isValid(senha)){
                errorMsgSetter("Mínimo 6 caracteres");
            }else{
                errorMsgSetter("");
            }
            valueSetter(senha);
        }catch(error){
            console.error(`Senha -> Erro handling onChange event: ${error.message}`);
        }
    }
}