import Key from "./key";
import Str from "./str";

export default class CNPJ {
    static #pesos = [
        6, 5, 4, 3, 2,
        9, 8, 7, 6, 5, 4, 3, 2
    ];

    static #numeroPrimo = 11;

    static #strictMask = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d\d$/;
    static #incompleteMask = /^\d{0,2}\.?\d{0,3}\.?\d{0,3}\/?\d{0,4}-?\d{0,1}$/;
    static #validKeysMask = /\d|\.|-|\//;

    static get maxLength () { return 18; }
    static get minLength () { return 14; }
    static get mask() { return "00.000.000/0000-00"; }

    static isNumericValid(cnpj){
        if(CNPJ.isFormatValid(cnpj)){
            const cnpjDigitos = CNPJ.getOnlyDigits(cnpj);
            const digitoDeVerificao1 = parseInt(cnpjDigitos[cnpjDigitos.length-2]);
            const digitoDeVerificao2 = parseInt(cnpjDigitos[cnpjDigitos.length-1]);
            const digitoCalculado1 = CNPJ.#calcPrimeiroDigito(cnpjDigitos);
            const digitoCalculado2 = CNPJ.#calcSegundoDigito(cnpjDigitos);

            return digitoCalculado1 === digitoDeVerificao1 &&
                digitoCalculado2 === digitoDeVerificao2;
        }
        return false;
    }

    static isFormatValid(cnpj){
        return CNPJ.#strictMask.test(cnpj);
    }

    static isValidKey(key){
        return CNPJ.#validKeysMask.test(key);
    }

    static getNextFormatKey(cnpj){
        if(/^\d{2}$/.test(cnpj) || /^\d{2}\.?\d{3}$/.test(cnpj))
            return ".";
        else if(/^\d{2}\.?\d{3}\.?\d{3}$/.test(cnpj))
            return "/";
        else if(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}$/.test(cnpj))
            return "-";
        else
            return "";
    }

    static hasNextKey(cnpj){
        return CNPJ.#incompleteMask.test(cnpj);
    }

    static getOnlyDigits(cnpj){
        return cnpj.replaceAll(".", "").replaceAll("-", "").replaceAll("/", "");
    }

    static getFormated(cnpj){
        if(/\d{14}/.test(cnpj))
            return `${cnpj.substr(0,2)}.${cnpj.substr(2,3)}.${cnpj.substr(5,3)}/${cnpj.substr(8,4)}-${cnpj.substr(12,2)}`;
        return cnpj;
    }

    static handleKeyDown(event){
        try{
            if(Key.isControl(event.key)) return;
    
            if(!CNPJ.isValidKey(event.key)){
                event.preventDefault();
            }else if(!CNPJ.hasNextKey(event.target.value)){
                event.preventDefault();
            }else{
                event.target.value += CNPJ.getNextFormatKey(event.target.value);
            }
        }catch(error){
            console.error(`CNPJ -> Erro handling keyDown event: ${error.message}`);
        }
    }

    static handleOnChange(cpf, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(cpf)){
                errorMsgSetter("Obrigatório!");
            }
            else if(CNPJ.hasNextKey(cpf)){
                errorMsgSetter("Incompleto!");
            }else if(!CNPJ.isNumericValid(cpf)){
                errorMsgSetter("Inválido!");
            }else{
                errorMsgSetter("");
            }
            valueSetter(cpf);
        }catch(error){
            console.error(`CNPJ -> Erro handling onChange event: ${error.message}`);
        }
    }

    static #calcPrimeiroDigito(cnpj){
        const soma = 
            CNPJ.#pesos[1] /*5*/*parseInt(cnpj[0]) +
            CNPJ.#pesos[2] /*4*/*parseInt(cnpj[1]) +
            CNPJ.#pesos[3] /*3*/*parseInt(cnpj[2]) +
            CNPJ.#pesos[4] /*2*/*parseInt(cnpj[3]) +
            CNPJ.#pesos[5] /*9*/*parseInt(cnpj[4]) +
            CNPJ.#pesos[6] /*8*/*parseInt(cnpj[5]) +
            CNPJ.#pesos[7] /*7*/*parseInt(cnpj[6]) +
            CNPJ.#pesos[8] /*6*/*parseInt(cnpj[7]) +
            CNPJ.#pesos[9] /*5*/*parseInt(cnpj[8]) +
            CNPJ.#pesos[10]/*4*/*parseInt(cnpj[9]) +
            CNPJ.#pesos[11]/*3*/*parseInt(cnpj[10]) +
            CNPJ.#pesos[12]/*2*/*parseInt(cnpj[11]);
        
        const resto = soma % CNPJ.#numeroPrimo;
        return (resto === 0 || resto === 1)? 0 : CNPJ.#numeroPrimo-resto;
    }

    static #calcSegundoDigito(cnpj){
        const soma = 
            CNPJ.#pesos[0] /*6*/ *parseInt(cnpj[0]) +
            CNPJ.#pesos[1] /*5*/ *parseInt(cnpj[1]) +
            CNPJ.#pesos[2] /*4*/ *parseInt(cnpj[2]) +
            CNPJ.#pesos[3] /*3*/ *parseInt(cnpj[3]) +
            CNPJ.#pesos[4] /*2*/ *parseInt(cnpj[4]) +
            CNPJ.#pesos[5] /*9*/ *parseInt(cnpj[5]) +
            CNPJ.#pesos[6] /*8*/ *parseInt(cnpj[6]) +
            CNPJ.#pesos[7] /*7*/ *parseInt(cnpj[7]) +
            CNPJ.#pesos[8] /*6*/ *parseInt(cnpj[8]) +
            CNPJ.#pesos[9] /*5*/ *parseInt(cnpj[9]) +
            CNPJ.#pesos[10]/*4*/ *parseInt(cnpj[10]) +
            CNPJ.#pesos[11]/*3*/ *parseInt(cnpj[11]) +
            CNPJ.#pesos[12]/*2*/ *parseInt(cnpj[12]);

        const resto = soma % CNPJ.#numeroPrimo;
        return (resto === 0 || resto === 1)? 0 : CNPJ.#numeroPrimo - resto;
    }
}
