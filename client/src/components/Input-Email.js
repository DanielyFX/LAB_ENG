import Form from "react-bootstrap/Form";
import { Validar } from "../pages/validacao";
import { useState } from "react";

export default function InputEmail({valueSetter, msgError, msgErrorSetter, defaultValue, required=false, disabled=false, readOnly=false}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                type="email"
                required={required} 
                disabled={disabled} 
                readOnly={readOnly} 
                defaultValue={defaultValue ?? ''} 
                isInvalid={msgError ?? erro}
                placeholder={Validar.Email.mask}
                onKeyDown={(e) => Validar.Email.handleKeyDown(e)}
                onChange={(e) => {
                    if(disabled) return;
                    if(valueSetter && msgErrorSetter)
                        Validar.Email.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        Validar.Email.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
