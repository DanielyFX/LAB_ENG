import Form from "react-bootstrap/Form";
import TelefoneFixo from "../utils/telefone-fixo";
import { useState } from "react";

export default function InputTelefoneFixo({valueSetter, msgError, msgErrorSetter, defaultValue, ...props}){
    const [erro, setErro] = useState('');
    const {value, disabled, readOnly} = props;
    
    // Para resolver o problema do controle ir de UNCONTROLED TO CONTROLED
    if(value !== undefined && defaultValue !== undefined){
        if(disabled !== undefined || readOnly !== undefined){
            props.value = undefined;
        }else{
            defaultValue = undefined;
        }
    }

    return (
        <>
            <Form.Control
                {...props}
                type="text"
                defaultValue={defaultValue ? TelefoneFixo.getFormated(defaultValue) : undefined}
                style={{minWidth: "160px", maxWidth: "170px"}}
                isInvalid={msgError ?? erro}
                placeholder={TelefoneFixo.mask}
                minLength={TelefoneFixo.minLength}
                maxLength={TelefoneFixo.maxLength}
                onKeyDown={(e) => TelefoneFixo.handleKeyDown(e)}
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        TelefoneFixo.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        TelefoneFixo.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )
}