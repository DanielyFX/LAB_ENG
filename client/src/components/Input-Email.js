import Form from "react-bootstrap/Form";
import Email from "../utils/email";
import { useState } from "react";

export default function InputEmail({valueSetter, msgError, msgErrorSetter, disabled, ...props}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                {...props} 
                type="email"
                isInvalid={msgError ?? erro}
                placeholder={Email.mask}
                onKeyDown={(e) => Email.handleKeyDown(e)}
                onChange={(e) => {
                    if(disabled) return;
                    if(valueSetter && msgErrorSetter)
                        Email.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        Email.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
