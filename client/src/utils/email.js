import Key from "./key";
import Str from "./str";

export default class Email {
    static #emailReg = /^[^\s.][\w-]+(.[\w-]+)*@([\w-]+.)+[\w-]{2,}$/;
    static #emailKeys = /\w|\.|-|@|\S/;

    static get mask() { return "exemplo@email.com"; }

    static isValid(email){
        return Email.#emailReg.test(email);
    }

    static isValidKey(key){
        return Email.#emailKeys.test(key);
    }

    static handleKeyDown(event){
        try{
            if(Key.isControl(event.key)) return;
    
            if(!Email.isValidKey(event.key)){
                event.preventDefault();
            }
        }catch(error){
            console.error(`Email: Erro handling keyDown event - ${error.message}`);
        }
    }

    static handleOnChange(email, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(email)){
                errorMsgSetter("Obrigatório!");
            }
            else if(!Email.isValid(email)){
                errorMsgSetter("Incompleto!");
            }else{
                errorMsgSetter("");
            }
            valueSetter(email);
        }catch(error){
            console.error(`Email -> Erro handling onChange event: ${error.message}`);
        }
    }
}