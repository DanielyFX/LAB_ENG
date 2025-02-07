import { ToggleButton } from 'react-bootstrap';

export default function ToggleCpfCnpj({value, valueSetter, ...props}){

    return (
            <>
            <ToggleButton 
                type='radio' 
                className='rounded-start-2' 
                checked={value}
                variant={value ? 'primary' : 'outline-primary-subtle'}
                onClick={() => valueSetter(true)}
                {...props} 
            >CPF</ToggleButton>
            <ToggleButton 
                type='radio'
                checked={!value}
                variant={value ? 'outline-primary-subtle' : 'primary'}
                onClick={() => valueSetter(false)}
                {...props} 
            >CNPJ</ToggleButton>
        </>
    );
}