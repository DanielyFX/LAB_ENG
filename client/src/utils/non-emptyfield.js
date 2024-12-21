import Key from "./key";
import Str from "./str";

export default class NonEmptyField {

    static isValid(value){
        if(typeof value === 'string')
            return Str.isNotEmpty(value);
        return value !== null && value !== undefined; 
    }

    static handleKeyDown(event){
        try{
            console.log(`Key = ${event.key}`);
            if(Key.isControl(event.key)) return;
            
            console.log(`Key Reg= ${/[\w\d\s]/.test(event.key)}`);
            if(!/[\w\d\s]/.test(event.key)){
                event.preventDefault();
            }
        }catch(error){
            console.error(`NonEmptyField -> Erro handling keyDown evenet: ${error.message}`);
        }
    }

    static handleOnChange(text, valueSetter, errorMsgSetter){
        try{
            if(!Str.isNotEmpty(text)){
                errorMsgSetter("Obrigatório!");
            }else{
                errorMsgSetter("");
            }
            valueSetter(text);
        }catch(error){
            console.error(`NonEmptyField -> Erro handling onChange event: ${error.message}`);
        }
    }
}