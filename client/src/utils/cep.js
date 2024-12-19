import { Validar } from '../pages/validacao';

export default class CEP {
    static #strictMask = /^\d{5}-?\d{3}$/;
    static #incompleteMask = /^\d{0,5}-?\d{0,2}$/;
    static #validKeys = /^\d$|^-$/;

    static get maxLength () { return 9; }
    static get minLength () { return 8; }
    static get mask() { return "00000-000"; }

    static isFormatValid(telefone){
        return CEP.#strictMask.test(telefone);
    }

    static isValidKey(key){
        return CEP.#validKeys.test(key);
    }

    static getNextFormatKey(cep){
        if(/^\d{5}$/.test(cep))
            return "-";
        else
            return "";
    }

    static hasNextKey(cep){
        return CEP.#incompleteMask.test(cep);
    }

    static getOnlyDigits(cep){
        return cep.replace(/\D/g, "");
    }

    static getFormated(cep){
        if(/^\d{8}$/.test(cep))
            return cep.substr(0,5) + "-" + cep.substr(5,7);
        return cep;
    }

    static handleKeyDown(event){
        try{
            if(Validar.isCaracterDeControle(event.key)) return;
    
            if(!CEP.isValidKey(event.key)){
                event.preventDefault();
            }else if(!CEP.hasNextKey(event.target.value)){
                event.preventDefault();
            }else{
                event.target.value += CEP.getNextFormatKey(event.target.value);
            }
        }catch(err){
            console.error(`${CEP.name} -> Erro handling keyDown evenet: ${err}`);
        }
    }

    static handleOnChange(cep, valueSetter, errorMsgSetter){
        try{
            if(!Validar.isNotEmptyStr(cep)){
                errorMsgSetter("Obrigatório!");
            }
            else if(CEP.hasNextKey(cep)){
                errorMsgSetter("Incompleto!");
            }else{
                errorMsgSetter("");
                valueSetter(CEP.getOnlyDigits(cep));
            }
        }catch(err){
            console.error(`${CEP.name} -> Erro handling onChange evenet: ${err}`);
        }
    }

    static async getDataFrom(cep){
        try{
            const response = await fetch(CEP.#getURI(cep));
            if(!response.ok)
                throw new Error(`Erro em obter o CEP. HTTP-${response.status}`);
  
            const data = await response.json();
            if("erro" in data)
                throw new Error("CEP não encontrado");
            
            return data;
        }catch(err){
            if(err instanceof TypeError)
                if(err.message === "Failed to fetch")
                    throw new Error(`Verifique sua conexão com a internet`);
                else
                    throw new Error(err.message);
            else
                throw new Error(err);
        }
    }

    static #getURI(cep){
        return `https://viacep.com.br/ws/${cep}/json/`;
    }
}