import Form from "react-bootstrap/Form";
import { Validar } from "../pages/validacao";
import { useState } from "react";

export default function InputDataContrato({valueSetter, msgError, msgErrorSetter, defaultValue, required=false, disabled=false, readOnly=false}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                type="date"
                required={required} 
                disabled={disabled} 
                readOnly={readOnly} 
                defaultValue={defaultValue ?? Validar.DataContrato.TodayHTMLDateFormat}
                isInvalid={msgError ?? erro}
                max={Validar.DataContrato.TodayHTMLDateFormat} 
                onChange={(e) => {
                    if(disabled) return;
                    if(valueSetter && msgErrorSetter)
                        Validar.DataContrato.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        Validar.DataContrato.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
