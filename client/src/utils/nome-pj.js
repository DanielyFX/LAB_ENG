import Key from "./key";
import Str from "./str";

export default class NomePJ{
    static #nomeReg = /^[a-zãõáéíóúäïüëöâêîôû\d\W]{3,}[a-zãõáéíóúäïüëöâêîôû\d\W\s]*$/i;
    static #nomeKeys = /[a-zãõáéíóúäïüëöâêîôû\d\W]| /i;

    static isValid(nome){
        return NomePJ.#nomeReg.test(nome);
    }

    static isValidKey(key){
        return NomePJ.#nomeKeys.test(key);
    }

    static handleKeyDown(event){
        try{
            if(Key.isControl(event.key)) return;
    
            if(!NomePJ.isValidKey(event.key)){
                event.preventDefault();
            }
        }catch(error){
            console.error(`NomePessoajuridica -> Erro handling keyDown event: ${error.message}`);
        }
    }

    static handleOnChange(nome, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(nome)){
                errorMsgSetter("Obrigatório!");
            }
            else if(!NomePJ.isValid(nome)){
                errorMsgSetter("Pelo menos 3 letras.");
            }else{
                errorMsgSetter("");
            }
            valueSetter(nome);
        }catch(error){
            console.error(`NomePessoajuridica -> Erro handling onChange event: ${error.message}`);
        }
    }
}
