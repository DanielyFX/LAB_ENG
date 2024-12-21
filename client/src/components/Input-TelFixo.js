import Form from "react-bootstrap/Form";
import TelefoneFixo from "../utils/telefone-fixo";
import { useState } from "react";

export default function InputTelefoneFixo({valueSetter, msgError, msgErrorSetter, defaultValue, ...props}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                {...props}
                type="text"
                defaultValue={TelefoneFixo.getFormated(defaultValue ?? '')}
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