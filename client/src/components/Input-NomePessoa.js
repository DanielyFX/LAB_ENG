import Form from "react-bootstrap/Form";
import NomePF from '../utils/nome-pf';
import NomePJ from '../utils/nome-pj';
import { useState } from "react";

export default function InputNomePessoa({valueSetter, msgError, msgErrorSetter, disabled, pf, pj, ...props}){
    const [erro, setErro] = useState('');
    pf = pf ?? false;
    pj = pf ? false : true;

    return (
        <>
            <Form.Control
                { ...props }
                type="text"
                isInvalid={msgError ?? erro}
                onKeyDown={(e) => pf ? NomePF.handleKeyDown(e) : NomePJ.handleKeyDown(e) }
                onChange={(e) => {
                    if(disabled) return;
                    if(valueSetter && msgErrorSetter)
                        if(pf) NomePF.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                        else NomePJ.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        if(pf) NomePF.handleOnChange(e.target.value, valueSetter, setErro);
                        else NomePJ.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
