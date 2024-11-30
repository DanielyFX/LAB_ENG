import Form from "react-bootstrap/Form";
import { Validar } from "../pages/validacao";
import { useState } from "react";

export default function InputTextRelativeToCEP({id, value, valueSetter, msgCepError, msgError, msgErrorSetter, defaultValue, required=false, disabled=false, readOnly=false}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                id={id} 
                type="text"
                value={value ?? ''} 
                required={required} 
                disabled={disabled} 
                readOnly={readOnly || !(msgCepError && msgCepError !== "Obrigatório!" && msgCepError !== "Incompleto!")} 
                className={(msgCepError && msgCepError !== "Obrigatório!" && msgCepError !== "Incompleto!")?"":"bg-secondary-subtle"} 
                defaultValue={defaultValue}
                isInvalid={msgError ?? erro} 
                onKeyDown={(e) => Validar.NonEmptyField.handleKeyDown(e)} 
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        Validar.NonEmptyField.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        Validar.NonEmptyField.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
