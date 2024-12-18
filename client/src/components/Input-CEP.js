import Form from "react-bootstrap/Form";
import { Validar } from "../pages/validacao";
import { useState } from "react";

export default function InputCEP({id, valueSetter, msgError, msgErrorSetter, defaultValue, value, onBlur, required=false, disabled=false, readOnly=false}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                id={id} 
                type="text"
                required={required} 
                disabled={disabled} 
                readOnly={readOnly} 
                value={value}
                defaultValue={defaultValue ? Validar.CEP.getFormated(defaultValue) : undefined}
                style={{minWidth: "150px", maxWidth: "160px"}}
                isInvalid={msgError ?? erro}
                placeholder={Validar.CEP.mask}
                minLength={Validar.CEP.minLength}
                maxLength={Validar.CEP.maxLength}
                onBlur={onBlur}
                onKeyDown={(e) => Validar.CEP.handleKeyDown(e)}
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        Validar.CEP.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        Validar.CEP.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
