import Key from "./key";
import Str from "./str";

export default class CPF {
    static #pesos = [
        11, 10, 9, 8, 7,
        6, 5, 4, 3, 2
    ];

    static #numeroPrimo = 11;

    static #strictMask = /^\d{3}\.?\d{3}\.?\d{3}-?\d\d$/;
    static #incompleteMask = /^\d{0,3}\.?\d{0,3}\.?\d{0,3}-?\d{0,1}$/;
    static #validKeysMask = /^[\d.-]{1}$/;

    static get lengthMin() {return 11;}
    static get lengthMax() {return 14;}
    static get mask() { return "000.000.000-00"; }

    static isNumericValid(cpf){
        if(CPF.isFormatValid(cpf)){
            const cpfDigitos = CPF.getOnlyDigits(cpf);
            
            const digitoDeVerificao1 = parseInt(cpfDigitos[cpfDigitos.length-2]);
            const digitoDeVerificao2 = parseInt(cpfDigitos[cpfDigitos.length-1]);
            const digitoCalculado1 = CPF.#calcPrimeiroDigito(cpfDigitos);
            const digitoCalculado2 = CPF.#calcSegundoDigito(cpfDigitos);
            
            return digitoCalculado1 === digitoDeVerificao1 &&
                digitoCalculado2 === digitoDeVerificao2;
        }
        return false;
    }

    static isFormatValid(cpf){
        return CPF.#strictMask.test(cpf);
    }

    static isValidKey(key){
        return CPF.#validKeysMask.test(key);
    }

    static getNextFormatKey(cpf){
        if(/^\d{3}$/.test(cpf) || /^\d{3}\.?\d{3}$/.test(cpf))
            return ".";
        else if(/^\d{3}\.?\d{3}\.?\d{3}$/.test(cpf))
            return "-";
        else
            return "";
    }

    static hasNextKey(cpf){
        return CPF.#incompleteMask.test(cpf);
    }

    static getOnlyDigits(cpf){
        return cpf.replaceAll(".", "").replaceAll("-", "");
    }

    static getFormated(cpf){
        if(/\d{11}/.test(cpf))
            return `${cpf.substr(0,3)}.${cpf.substr(3,3)}.${cpf.substr(6,3)}-${cpf.substr(9,2)}`;
        return cpf;
    }

    static handleKeyDown(event){
        try{
            if(Key.isControl(event.key)) return;
    
            if(!CPF.isValidKey(event.key)){
                event.preventDefault();
            }else if(!CPF.hasNextKey(event.target.value)){
                event.preventDefault();
            }else{
                event.target.value += CPF.getNextFormatKey(event.target.value);
            }
        }catch(error){
            console.error(`CadastroPessoaFisica.name -> Erro handling keDown event: ${error.message}`);
        }
    }

    static handleOnChange(cpf, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(cpf)){
                errorMsgSetter("Obrigatório!");
            }
            else if(CPF.hasNextKey(cpf)){
                errorMsgSetter("Incompleto!");
            }else if(!CPF.isNumericValid(cpf)){
                errorMsgSetter("Inválido!");
            }else{
                errorMsgSetter("");
            }
            valueSetter(cpf);
        }catch(error){
            console.error(`CPF -> Erro handling onChange event: ${error.message}`);
      }
    }

    static #calcPrimeiroDigito(cpf){
        const soma = 
            CPF.#pesos[1]/*10*/ *parseInt(cpf[0]) +
            CPF.#pesos[2] /*9*/ *parseInt(cpf[1]) +
            CPF.#pesos[3] /*8*/ *parseInt(cpf[2]) +
            CPF.#pesos[4] /*7*/ *parseInt(cpf[3]) +
            CPF.#pesos[5] /*6*/ *parseInt(cpf[4]) +
            CPF.#pesos[6] /*5*/ *parseInt(cpf[5]) +
            CPF.#pesos[7] /*4*/ *parseInt(cpf[6]) +
            CPF.#pesos[8] /*3*/ *parseInt(cpf[7]) +
            CPF.#pesos[9] /*2*/ *parseInt(cpf[8]);
       
        const resto = soma % CPF.#numeroPrimo;
        return (resto === 0 || resto === 1)? 0 : CPF.#numeroPrimo-resto;
    }

    static #calcSegundoDigito(cpf){
        const soma = 
            CPF.#pesos[0]/*11*/ *parseInt(cpf[0]) +
            CPF.#pesos[1]/*10*/ *parseInt(cpf[1]) +
            CPF.#pesos[2] /*9*/ *parseInt(cpf[2]) +
            CPF.#pesos[3] /*8*/ *parseInt(cpf[3]) +
            CPF.#pesos[4] /*7*/ *parseInt(cpf[4]) +
            CPF.#pesos[5] /*6*/ *parseInt(cpf[5]) +
            CPF.#pesos[6] /*5*/ *parseInt(cpf[6]) +
            CPF.#pesos[7] /*4*/ *parseInt(cpf[7]) +
            CPF.#pesos[8] /*3*/ *parseInt(cpf[8]) +
            CPF.#pesos[9] /*2*/ *parseInt(cpf[9]);
        
            const resto = soma % CPF.#numeroPrimo;
        return (resto === 0 || resto === 1)? 0 : CPF.#numeroPrimo - resto;
    }
}