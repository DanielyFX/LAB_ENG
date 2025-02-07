import Form from "react-bootstrap/Form";
import CEP from "../utils/cep";
import { useState } from "react";

export default function InputCEP({id, valueSetter, msgError, msgErrorSetter, defaultValue, ...props}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                {...props} 
                type="text"
                defaultValue={defaultValue ? CEP.getFormated(defaultValue) : undefined}
                style={{minWidth: "150px", maxWidth: "160px"}}
                isInvalid={msgError ?? erro}
                placeholder={CEP.mask}
                minLength={CEP.minLength}
                maxLength={CEP.maxLength}
                onKeyDown={(e) => CEP.handleKeyDown(e)}
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        CEP.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        CEP.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
