import Form from "react-bootstrap/Form";
import { Validar } from "../pages/validacao";
import { useState } from "react";

export default function InputCPF({id, valueSetter, msgError, msgErrorSetter, defaultValue, required=false, disabled=false, readOnly=false}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                id={id} 
                type="text"
                required={required} 
                disabled={disabled} 
                readOnly={readOnly} 
                defaultValue={Validar.CPF.getFormated(defaultValue ?? '')}
                style={{minWidth: "160px", maxWidth: "170px"}}
                isInvalid={msgError ?? erro}
                placeholder={Validar.CPF.mask}
                minLength={Validar.CPF.minLength}
                maxLength={Validar.CPF.maxLength}
                onKeyDown={(e) => Validar.CPF.handleKeyDown(e)}
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        Validar.CPF.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        Validar.CPF.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
