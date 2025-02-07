import Form from "react-bootstrap/Form";
import Senha from "../utils/senha";
import { useState } from "react";

export default function InputPassword({valueSetter, msgError, msgErrorSetter, disabled, ...props}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                { ...props }
                type="password"
                isInvalid={msgError ?? erro}
                onKeyDown={(e) => Senha.handleKeyDown(e)}
                onChange={(e) => {
                    if(disabled) return;
                    if(valueSetter && msgErrorSetter)
                        Senha.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        Senha.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
