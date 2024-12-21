import Key from "./key";
import Str from "./str";

export default class NomeServico {
    static #nomeReg = /^[\w\W\d]{3,}[\w\d\s]*$/i;
    static #nomeKeys = /[\w\W\d\s]/i;

    static isValid(nome){
        return NomeServico.#nomeReg.test(nome);
    }

    static isValidKey(key){
        return NomeServico.#nomeKeys.test(key);
    }

    static handleKeyDown(event){
        try{
            if(Key.isControl(event.key)) return;
    
            if(!NomeServico.isValidKey(event.key)){
                event.preventDefault();
            }
        }catch(error){
            console.error(`NomeServiço -> Erro handling keyDown event: ${error.message}`);
        }
    }

    static handleOnChange(nome, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(nome)){
                errorMsgSetter("Obrigatório!");
            }
            else if(!NomeServico.isValid(nome)){
                errorMsgSetter("Pelo menos 3 letras");
            }else{
                errorMsgSetter("");
            }
            valueSetter(nome);
        }catch(error){
            console.error(`NomeServiço -> Erro handling onChange event: ${error.message}`);
        }
    }
}