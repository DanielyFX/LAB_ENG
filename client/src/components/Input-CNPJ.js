import Form from "react-bootstrap/Form";
import CNPJ from '../utils/cnpj'
import { useState } from "react";

export default function InputCNPJ({ valueSetter, msgError, msgErrorSetter, defaultValue, feedbackStyle, ...props}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                {...props}
                type="text"
                defaultValue={CNPJ.getFormated(defaultValue ?? '')}
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
