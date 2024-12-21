import Key from "./key";
import Str from "./str";

export default class NomePF {
    static #nomeReg = /^[a-zãõáéíóúäïüëöâêîôû]{3,}[a-zãõáéíóúäïüëöâêîôû ]*$/i;
    static #nomeKeys = /[a-zãõáéíóúäïüëöâêîôû]| /i;

    static isValid(nome){
        return NomePF.#nomeReg.test(nome);
    }

    static isValidKey(key){
        return NomePF.#nomeKeys.test(key);
    }

    static handleKeyDown(event){
        try{
            if(Key.isControl(event.key)) return;
    
            if(!NomePF.isValidKey(event.key)){
                event.preventDefault();
            }
        }catch(error){
            console.error(`NomePessoaFisica -> Erro handling keyDown event: ${error.message}`);
        }
    }

    static handleOnChange(nome, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(nome)){
                errorMsgSetter("Obrigatório!");
            }
            else if(!NomePF.isValid(nome)){
                errorMsgSetter("Pelo menos 3 letras.");
            }else{
                errorMsgSetter("");
            }
            valueSetter(nome);
        }catch(error){
            console.error(`NomePessoaFisica -> Erro handling onChange event: ${error.message}`);
        }
    }
}