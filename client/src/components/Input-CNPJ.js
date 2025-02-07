import Form from "react-bootstrap/Form";
import CNPJ from '../utils/cnpj'
import { useState } from "react";

export default function InputCNPJ({ valueSetter, msgError, msgErrorSetter, defaultValue, feedbackStyle, ...props}){
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
                defaultValue={defaultValue ? CNPJ.getFormated(defaultValue) : undefined}
                style={{minWidth: "190px", maxWidth: "200px"}}
                isInvalid={msgError ?? erro}
                placeholder={CNPJ.mask}
                minLength={CNPJ.minLength}
                maxLength={CNPJ.maxLength}
                onKeyDown={(e) => CNPJ.handleKeyDown(e)}
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        CNPJ.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        CNPJ.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid" style={feedbackStyle}>
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
