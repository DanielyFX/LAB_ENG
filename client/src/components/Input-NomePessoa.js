import Form from "react-bootstrap/Form";
import { Validar } from "../pages/validacao";
import { useState } from "react";

export default function InputNomePessoa({valueSetter, msgError, msgErrorSetter, defaultValue, pf, pj, value, required=false, disabled=false, readOnly=false}){
    const [erro, setErro] = useState('');
    pf = pf ?? false;
    pj = pf ? false : true;

    return (
        <>
            <Form.Control
                type="text"
                required={required} 
                disabled={disabled} 
                readOnly={readOnly} 
                defaultValue={defaultValue ?? ''} 
                isInvalid={disabled? false : msgError ?? erro}
                value={value} 
                onKeyDown={(e) => pf ? Validar.NomePF.handleKeyDown(e) : Validar.NomePJ.handleKeyDown(e) }
                onChange={(e) => {
                    if(disabled) return;
                    if(valueSetter && msgErrorSetter)
                        if(pf) Validar.NomePF.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                        else Validar.NomePJ.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        if(pf) Validar.NomePF.handleOnChange(e.target.value, valueSetter, setErro);
                        else Validar.NomePJ.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
