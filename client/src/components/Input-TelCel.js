import Form from "react-bootstrap/Form";
import { Validar } from "../pages/validacao";
import { useState } from "react";

export default function InputTelefoneCelular({valueSetter, msgError, msgErrorSetter, defaultValue, required=false, disabled=false, readOnly=false}){
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
                type="text"
                required={required} 
                disabled={disabled} 
                readOnly={readOnly} 
                defaultValue={Validar.TelCel.getFormated(defaultValue ?? '')}
                style={{minWidth: "160px", maxWidth: "170px"}}
                isInvalid={disabled? false : msgError ?? erro }
                placeholder={Validar.TelCel.mask}
                minLength={Validar.TelCel.minLength}
                maxLength={Validar.TelCel.maxLength}
                onKeyDown={(e) => Validar.TelCel.handleKeyDown(e)}
                onChange={(e) => {
                    if(disabled) return;
                    if(valueSetter && msgErrorSetter)
                        Validar.TelCel.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        Validar.TelCel.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )
}