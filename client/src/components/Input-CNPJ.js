import Form from "react-bootstrap/Form";
import { Validar } from "../pages/validacao";
import { useState } from "react";

export default function InputCNPJ({id, valueSetter, msgError, msgErrorSetter, defaultValue, onBlur, required=false, disabled=false, readOnly=false}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                id={id}
                type="text"
                required={required} 
                disabled={disabled} 
                readOnly={readOnly} 
                defaultValue={Validar.CNPJ.getFormated(defaultValue ?? '')}
                style={{minWidth: "190px", maxWidth: "200px"}}
                isInvalid={msgError ?? erro}
                placeholder={Validar.CNPJ.mask}
                minLength={Validar.CNPJ.minLength}
                maxLength={Validar.CNPJ.maxLength}
                onKeyDown={(e) => Validar.CNPJ.handleKeyDown(e)}
                onBlur={onBlur? (e) => onBlur(e.target.value) : undefined}
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        Validar.CNPJ.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        Validar.CNPJ.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
