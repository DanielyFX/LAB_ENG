import Form from "react-bootstrap/Form";
import TelefoneCelular from "../utils/telefone-celular";
import { useState } from "react";

export default function InputTelefoneCelular({valueSetter, msgError, msgErrorSetter, defaultValue, ...props}){
    const [erro, setErro] = useState('');
    const {value, disabled, readOnly} = props;
    
    // Para resolver o problema do controle ir de UNCONTROLED TO CONTROLED
    if(value !== undefined && defaultValue !== undefined){
        if(disabled !== undefined || readOnly !== undefined){
            props.value = undefined;
        }else{
            defaultValue = undefined;
        }
    }

    return (
        <>
            <Form.Control
                {...props}
                type="text"
                defaultValue={defaultValue ? TelefoneCelular.getFormated(defaultValue) : undefined}
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