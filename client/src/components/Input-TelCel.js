import Form from "react-bootstrap/Form";
import TelefoneCelular from "../utils/telefone-celular";
import { useState } from "react";

export default function InputTelefoneCelular({valueSetter, msgError, msgErrorSetter, defaultValue, ...props}){
    const [erro, setErro] = useState('');
    // console.group('TelefoneCelularComponent');
    // console.log(`valueSetter: ${valueSetter} ${valueSetter===undefined}`);
    // console.log(`msgError: ${msgError} ${msgError===undefined}`);
    // console.log(`msgErrorSetter: ${msgErrorSetter} ${msgErrorSetter===undefined}`);
    // console.log(`required: ${required} ${required===undefined}`);
    // console.groupEnd('TelefoneCelularComponent');

    return (
        <>
            <Form.Control
                {...props}
                type="text"
                defaultValue={TelefoneCelular.getFormated(defaultValue ?? '')}
                style={{minWidth: "160px", maxWidth: "170px"}}
                isInvalid={ msgError ?? erro }
                placeholder={TelefoneCelular.mask}
                minLength={TelefoneCelular.minLength}
                maxLength={TelefoneCelular.maxLength}
                onKeyDown={(e) => TelefoneCelular.handleKeyDown(e)}
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        TelefoneCelular.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        TelefoneCelular.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )
}