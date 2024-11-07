
export class CadastroPessoaFisica {
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

    static isNumericValid(cpf){
        if(this.isFormatValid(cpf)){
            const cpfDigitos = this.getOnlyDigits(cpf);
            const digitoDeVerificao1 = parseInt(cpfDigitos[cpfDigitos.length-1]);
            const digitoDeVerificao2 = parseInt(cpfDigitos[cpfDigitos.length-2]);
            const digitoCalculado1 = this.#calcPrimeiroDigito(cpfDigitos);
            const digitoCalculado2 = this.#calcSegundoDigito(cpfDigitos);

            return digitoCalculado1 === digitoDeVerificao1 &&
                digitoCalculado2 === digitoDeVerificao2;
        }
        return false;
    }

    static isFormatValid(cpf){
        return this.#strictMask.test(cpf);
    }

    static isValidKey(key){
        return this.#validKeysMask.test(key);
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
        return this.#incompleteMask.test(cpf);
    }

    static getOnlyDigits(cpf){
        return cpf.replaceAll(".", "").replaceAll("-", "");
    }

    static handleKeyDown(event){
        try{
            if(Validar.isCaracterDeControle(event.key)) return;
    
            if(!this.isValidKey(event.key)){
                event.preventDefault();
            }else if(!this.hasNextKey(event.target.value)){
                event.preventDefault();
            }else{
                event.target.value += this.getNextFormatKey(event.target.value);
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling keDown evenet: ${err}`);
        }
    }

    static handleOnChange(cpf, valueSetter, errorMsgSetter){
        try{
            if(!Validar.isNotEmptyStr(cpf)){
                errorMsgSetter("Obrigatório!");
            }
            else if(this.hasNextKey(cpf)){
                errorMsgSetter("Incompleto!");
            }else if(!this.isNumericValid(cpf)){
                errorMsgSetter("Inválido!");
            }else{
                errorMsgSetter("");
                valueSetter(this.getOnlyDigits(cpf));
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling onChange evenet: ${err}`);
        }
    }

    static #calcPrimeiroDigito(cpf){
        const soma = 
            this.#pesos[1]/*10*/ *parseInt(cpf[0]) +
            this.#pesos[2] /*9*/ *parseInt(cpf[1]) +
            this.#pesos[3] /*8*/ *parseInt(cpf[2]) +
            this.#pesos[4] /*7*/ *parseInt(cpf[3]) +
            this.#pesos[5] /*6*/ *parseInt(cpf[4]) +
            this.#pesos[6] /*5*/ *parseInt(cpf[5]) +
            this.#pesos[7] /*4*/ *parseInt(cpf[6]) +
            this.#pesos[8] /*3*/ *parseInt(cpf[7]) +
            this.#pesos[9] /*2*/ *parseInt(cpf[8]);
       
        const resto = soma%this.#numeroPrimo;
        return (resto === 0 || resto === 1)? 0 : this.#numeroPrimo-soma;
    }

    static #calcSegundoDigito(cpf){
        const soma = 
            this.#pesos[0]/*11*/ *parseInt(cpf[0]) +
            this.#pesos[1]/*10*/ *parseInt(cpf[1]) +
            this.#pesos[2] /*9*/ *parseInt(cpf[2]) +
            this.#pesos[3] /*8*/ *parseInt(cpf[3]) +
            this.#pesos[4] /*7*/ *parseInt(cpf[4]) +
            this.#pesos[5] /*6*/ *parseInt(cpf[5]) +
            this.#pesos[6] /*5*/ *parseInt(cpf[6]) +
            this.#pesos[7] /*4*/ *parseInt(cpf[7]) +
            this.#pesos[8] /*3*/ *parseInt(cpf[8]) +
            this.#pesos[9] /*2*/ *parseInt(cpf[9]);
        const resto = soma%this.#numeroPrimo;
        return (resto === 0 || resto === 1)? 0 : this.#numeroPrimo - soma;
    }
}

export class CadastroNacionalPessoaJuridica {
    static #pesos = [
        6, 5, 4, 3, 2,
        9, 8, 7, 6, 5, 4, 3, 2
    ];

    static #numeroPrimo = 11;

    static #strictMask = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d\d$/;
    static #incompleteMask = /^\d{0,2}\.?\d{0,3}\.?\d{0,3}\/?\d{0,4}-?\d{0,1}$/;
    static #validKeysMask = /\d|\.|-|\//;

    static isNumericValid(cnpj){
        if(this.isFormatValid(cnpj)){
            const cnpjDigitos = this.getOnlyDigits(cnpj);
            const digitoDeVerificao1 = parseInt(cnpjDigitos[cnpjDigitos.length-1]);
            const digitoDeVerificao2 = parseInt(cnpjDigitos[cnpjDigitos.length-2]);
            const digitoCalculado1 = this.#calcPrimeiroDigito(cnpjDigitos);
            const digitoCalculado2 = this.#calcSegundoDigito(cnpjDigitos);

            return digitoCalculado1 === digitoDeVerificao1 &&
                digitoCalculado2 === digitoDeVerificao2;
        }
        return false;
    }

    static isFormatValid(cnpj){
        return this.#strictMask.test(cnpj);
    }

    static isValidKey(key){
        return this.#validKeysMask.test(key);
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
        return this.#incompleteMask.test(cnpj);
    }

    static getOnlyDigits(cnpj){
        return cnpj.replaceAll(".", "").replaceAll("-", "").replaceAll("/", "");
    }

    static handleKeyDown(event){
        try{
            if(Validar.isCaracterDeControle(event.key)) return;
    
            if(!this.isValidKey(event.key)){
                event.preventDefault();
            }else if(!this.hasNextKey(event.target.value)){
                event.preventDefault();
            }else{
                event.target.value += this.getNextFormatKey(event.target.value);
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling keyDown evenet: ${err}`);
        }
    }

    static handleOnChange(cpf, valueSetter, errorMsgSetter){
        try{
            if(!Validar.isNotEmptyStr(cpf)){
                errorMsgSetter("Obrigatório!");
            }
            else if(this.hasNextKey(cpf)){
                errorMsgSetter("Incompleto!");
            }else if(!this.isNumericValid(cpf)){
                errorMsgSetter("Inválido!");
            }else{
                errorMsgSetter("");
                valueSetter(this.getOnlyDigits(cpf));
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling onChange evenet: ${err}`);
        }
    }

    static #calcPrimeiroDigito(cnpj){
        const soma = 
            this.#pesos[1] /*5*/*parseInt(cnpj[0]) +
            this.#pesos[2] /*4*/*parseInt(cnpj[1]) +
            this.#pesos[3] /*3*/*parseInt(cnpj[2]) +
            this.#pesos[4] /*2*/*parseInt(cnpj[3]) +
            this.#pesos[5] /*9*/*parseInt(cnpj[4]) +
            this.#pesos[6] /*8*/*parseInt(cnpj[5]) +
            this.#pesos[7] /*7*/*parseInt(cnpj[6]) +
            this.#pesos[8] /*6*/*parseInt(cnpj[7]) +
            this.#pesos[9] /*5*/*parseInt(cnpj[8]) +
            this.#pesos[10]/*4*/*parseInt(cnpj[9]) +
            this.#pesos[11]/*3*/*parseInt(cnpj[10]) +
            this.#pesos[12]/*2*/*parseInt(cnpj[11]);
        
        const resto = soma%this.#numeroPrimo;
        return (resto === 0 || resto === 1)? 0 : this.#numeroPrimo-soma;
    }

    static #calcSegundoDigito(cnpj){
        const soma = 
            this.#pesos[0] /*6*/ *parseInt(cnpj[0]) +
            this.#pesos[1] /*5*/ *parseInt(cnpj[1]) +
            this.#pesos[2] /*4*/ *parseInt(cnpj[2]) +
            this.#pesos[3] /*3*/ *parseInt(cnpj[3]) +
            this.#pesos[4] /*2*/ *parseInt(cnpj[4]) +
            this.#pesos[5] /*9*/ *parseInt(cnpj[5]) +
            this.#pesos[6] /*8*/ *parseInt(cnpj[6]) +
            this.#pesos[7] /*7*/ *parseInt(cnpj[7]) +
            this.#pesos[8] /*6*/ *parseInt(cnpj[8]) +
            this.#pesos[9] /*5*/ *parseInt(cnpj[9]) +
            this.#pesos[10]/*4*/ *parseInt(cnpj[10]) +
            this.#pesos[11]/*3*/ *parseInt(cnpj[11]) +
            this.#pesos[12]/*2*/ *parseInt(cnpj[12]);

        const resto = soma%this.#numeroPrimo;
        return (resto === 0 || resto === 1)? 0 : this.#numeroPrimo - soma;
    }
}

export class TelefoneFixo {

    static #strictMask = /^\+?\d{0,3}\(?\d{2}\)?\d{4}-?\d{4}$/;
    static #incompleteMask = /^\+?\d{0,3}\(?\d{0,2}\)?\d{0,4}-?\d{0,3}$/;
    static #validFormatKeysMask = /[\d()+]/;

    static isFormatValid(telefone){
        return this.#strictMask.test(telefone);
    }

    static isValidKey(key){
        return this.#validFormatKeysMask.test(key);
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
        return this.#incompleteMask.test(telefone);
    }

    static getOnlyDigits(telefone){
        return telefone.replaceAll("+", "")
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .replaceAll("-", "");
    }

    static handleKeyDown(event){
        try{
            if(Validar.isCaracterDeControle(event.key)) return;
    
            if(!this.isValidKey(event.key)){
                event.preventDefault();
            }else if(!this.hasNextKey(event.target.value)){
                event.preventDefault();
            }else{
                event.target.value += this.getNextFormatKey(event.target.value);
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling keyDown evenet: ${err}`);
        }
    }

    static handleOnChange(telefone, valueSetter, errorMsgSetter){
        try{
            if(!Validar.isNotEmptyStr(telefone)){
                errorMsgSetter("Obrigatório!");
            }
            else if(this.hasNextKey(telefone)){
                errorMsgSetter("Incompleto!");
            }else{
                errorMsgSetter("");
                valueSetter(this.getOnlyDigits(telefone));
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling onChange evenet: ${err}`);
        }
    }
}

export class TelefoneCelular {

    static #strictMask = /^\+?\d{0,3}\(?\d{2}\)?\d{5}-?\d{4}$/;
    static #incompleteMask = /^\+?\d{0,3}\(?\d{0,2}\)?\d{0,5}-?\d{0,3}$/;
    static #validFormatKeysMask = /[\d()+]/;

    static isFormatValid(telefone){
        return this.#strictMask.test(telefone);
    }

    static isValidKey(key){
        return this.#validFormatKeysMask.test(key);
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
        return this.#incompleteMask.test(telefone);
    }

    static getOnlyDigits(telefone){
        return telefone.replaceAll("+", "")
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .replaceAll("-", "");
    }

    static handleKeyDown(event){
        try{
            if(Validar.isCaracterDeControle(event.key)) return;
    
            if(!this.isValidKey(event.key)){
                event.preventDefault();
            }else if(!this.hasNextKey(event.target.value)){
                event.preventDefault();
            }else{
                event.target.value += this.getNextFormatKey(event.target.value);
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling keyDown evenet: ${err}`);
        }
    }

    static handleOnChange(telefone, valueSetter, errorMsgSetter){
        try{
            if(!Validar.isNotEmptyStr(telefone)){
                errorMsgSetter("Obrigatório!");
            }
            else if(this.hasNextKey(telefone)){
                errorMsgSetter("Incompleto!");
            }else{
                errorMsgSetter("");
                valueSetter(this.getOnlyDigits(telefone));
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling onChange evenet: ${err}`);
        }
    }
}

export class NomePessoa {
    static #nomeReg = /^[a-zãõáéíóúäïüëöâêîôû]{3,}[a-zãõáéíóúäïüëöâêîôû ]*$/i;
    static #nomeKeys = /[a-zãõáéíóúäïüëöâêîôû]| /i;

    static isValid(nome){
        return this.#nomeReg.test(nome);
    }

    static isValidKey(key){
        return this.#nomeKeys.test(key);
    }

    static handleKeyDown(event){
        try{
            if(Validar.isCaracterDeControle(event.key)) return;
    
            if(!this.isValidKey(event.key)){
                event.preventDefault();
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling keyDown evenet: ${err}`);
        }
    }

    static handleOnChange(nome, valueSetter, errorMsgSetter){
        try{
            if(!Validar.isNotEmptyStr(nome)){
                errorMsgSetter("Obrigatório!");
            }
            else if(this.isValid(nome)){
                errorMsgSetter("Incompleto!");
            }else{
                errorMsgSetter("");
                valueSetter(nome);
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling onChange evenet: ${err}`);
        }
    }
}

export class Email {
    static #emailReg = /^[^\s.][\w-]+(.[\w-]+)*@([\w-]+.)+[\w-]{2,}$/;
    static #emailKeys = /\w|\.|-|@/;

    static isValid(email){
        return this.#emailReg.test(email);
    }

    static isValidKey(key){
        return this.#emailKeys.test(key);
    }

    static handleKeyDown(event){
        try{
            if(Validar.isCaracterDeControle(event.key)) return;
    
            if(!this.isValidKey(event.key)){
                event.preventDefault();
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling keyDown evenet: ${err}`);
        }
    }

    static handleOnChange(email, valueSetter, errorMsgSetter){
        try{
            if(!Validar.isNotEmptyStr(email)){
                errorMsgSetter("Obrigatório!");
            }
            else if(this.isValid(email)){
                errorMsgSetter("Incompleto!");
            }else{
                errorMsgSetter("");
                valueSetter(email);
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling onChange evenet: ${err}`);
        }
    }
}

export class Senha {
    static #senhaReg = /[\d\w \W]{6,}/;
    static #lowerCaseLetters = /[a-z]+/;
    static #upperCaseLetters = /[A-Z]+/;
    static #numbers = /\d+/;
    static #specialCharacters = /[_@-!?#]+/;

    static isSenha(senha){
        return this.#senhaReg.test(senha);
    }

    static hasLowerCaseLetters(senha){
        return this.#lowerCaseLetters.test(senha);
    }

    static hasUpperCaseLetters(senha){
        return this.#upperCaseLetters.test(senha);
    }

    static hasNumbers(senha){
        return this.#numbers.test(senha);
    }

    static hasSpecialCharacters(senha){
        return this.#specialCharacters.test(senha);
    }


    static handleKeyDown(event){
        try{
            if(Validar.isCaracterDeControle(event.key)) return;
    
            if(!this.isValidKey(event.key)){
                event.preventDefault();
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling keyDown evenet: ${err}`);
        }
    }

    static handleOnChange(senha, valueSetter, errorMsgSetter){
        try{
            if(!Validar.isNotEmptyStr(senha)){
                errorMsgSetter("Obrigatório!");
            }
            else if(this.isValid(senha)){
                errorMsgSetter("Mínimo 6 caracteres");
            }else{
                errorMsgSetter("");
                valueSetter(senha);
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling onChange evenet: ${err}`);
        }
    }
}

export class DataContrato {

    static get TodayHTMLDatetimeLocalFormat() {
        const today = new Date();
        return /\d{4}-\d\d-\d\dT\d\d:\d\d/.exec(today.toISOString())[0]
    }

    static handleOnChange(date, valueSetter, errorMsgSetter){
        try{
            const today = new Date();
            if(!Validar.isNotEmptyStr(date)){
                errorMsgSetter("Obrigatória!");
            }else if((today - date) < 0){
                errorMsgSetter("Inválida!");
            }else{
                valueSetter(date);
                errorMsgSetter("");
            }
        }catch(err){
            console.error(`${this.name} -> Erro handling onChange evenet: ${err}`);
        }
    }
}

export class Validar {
    static CPF = CadastroPessoaFisica;
    static CNPJ = CadastroNacionalPessoaJuridica;
    static TelFixo = TelefoneFixo;
    static TelCel = TelefoneCelular;
    static NomePessoa = NomePessoa;
    static Email = Email;
    static Senha = Senha;
    static DataContrato = DataContrato;
    
    static isCaracterDeControle(key){
        return key === "Backspace"
                || key === "ArrowLeft"
                || key === "ArrowRight"
                || key === "ArrowUp"
                || key === "ArrowDown"
                || key === "Enter"
                || key === "Tab"
                || key === "Home"
                || key === "Insert"
                || key === "Delete"
                || key === "Control"
                || key === "Shift"
                || key === "End";
    }

    static isNotEmptyStr(str){
        return str !== "" && str.trim() !== "";
    }

}