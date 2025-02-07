import Form from "react-bootstrap/Form";
import DataContrato from '../utils/data-contrato'
import { useState } from "react";

export default function InputDataContrato({valueSetter, msgError, msgErrorSetter, defaultValue, disabled, ...props}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                type="date"
                {...props} 
                style={{minWidth: "160px", maxWidth: "200px"}} 
                defaultValue={defaultValue ?? DataContrato.TodayHTMLDateFormat}
                isInvalid={msgError ?? erro}
                max={DataContrato.TodayHTMLDateFormat} 
                onChange={(e) => {
                    if(disabled) return;
                    if(valueSetter && msgErrorSetter)
                        DataContrato.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        DataContrato.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
