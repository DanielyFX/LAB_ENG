import Form from "react-bootstrap/Form";
import NonEmptyField from '../utils/non-emptyfield'
import { useState } from "react";

export default function InputTextRelativeToCEP({valueSetter, msgCepError, msgError, msgErrorSetter, defaultValue, type, readOnly, ...props}){
    const [erro, setErro] = useState('');

    return (
        <>
            <Form.Control
                {...props}
                type={type === undefined ? 'text' : type}
                min={type === 'number' ? 1 : undefined} 
                step={type === 'number' ? 1 : undefined}
                readOnly={type === 'number' ? false : (readOnly || !(msgCepError && msgCepError !== "Obrigatório!" && msgCepError !== "Incompleto!"))} 
                className={type === 'number'? 'mb-1' : (msgCepError && msgCepError !== "Obrigatório!" && msgCepError !== "Incompleto!")?"mb-1":"bg-secondary-subtle mb-1"} 
                defaultValue={defaultValue}
                isInvalid={msgError ?? erro} 
                onKeyDown={(e) => NonEmptyField.handleKeyDown(e)} 
                onChange={(e) => {
                    if(valueSetter && msgErrorSetter)
                        NonEmptyField.handleOnChange(e.target.value, valueSetter, msgErrorSetter);
                    else if(valueSetter)
                        NonEmptyField.handleOnChange(e.target.value, valueSetter, setErro);
                }}
            />
            <Form.Control.Feedback type="invalid">
                {msgError ?? erro}
            </Form.Control.Feedback>
        </>
    )

}
