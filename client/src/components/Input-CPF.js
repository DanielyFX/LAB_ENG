import Form from "react-bootstrap/Form";
import CPF from '../utils/cpf'
import { useState } from "react";

export default function InputCPF({valueSetter, msgError, msgErrorSetter, defaultValue, feedbackStyle, ...props}){
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
                defaultValue={defaultValue?CPF.getFormated(defaultValue):undefined}
                style={{minWidth: "160px", maxWidth: "170px"}}
                isInvalid={msgError ?? erro}
                placeholder={CPF.mask}
                minLength={CPF.minLength}
                maxLength={CPF.maxLength}
                onKeyDown={(e) => CPF.handleKeyDown(e)} 
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        CPF.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        CPF.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid" style={feedbackStyle}>
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
