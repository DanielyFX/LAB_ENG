import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import '../../css/clientes/cadclientes.css';
import { ButtonGroup } from "react-bootstrap";
import Str from "../../utils/str";
import CPF from "../../utils/cpf";
import CNPJ from "../../utils/cnpj";
import CEP from "../../utils/cep";
import Validar from "../../utils/validar";
import TelefoneCelular from "../../utils/telefone-celular";
import TelefoneFixo from "../../utils/telefone-fixo";
import InputEndereco, {searchCEP} from '../../components/Input-Endereco';
import InputDadosCliente from "../../components/Input-DadosCliente";

const searchForCEP = searchCEP();

export default function CadastrarCliente() {

    const [nome, setNome] = useState('');
    const [documento, setDocumento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');

    const [cpfChecked, setCPFChecked] = useState(true);
    const [cepError, setCepError] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');

    useEffect(()=>{
        setDocumento('');
    }, [cpfChecked]);

    useEffect(()=>{
        const updateCEP = async () => {
            try{
                const data = await searchForCEP(cep);
                if(data instanceof Object){
                    if("bairro" in data) setBairro(data.bairro ?? '');
                    if("estado" in data) setCidade(data.estado ?? '');
                    if("logradouro" in data) setRua(data.logradouro ?? '');
                }
                setCepError('');
            }catch(erro){
                setCepError(erro?.message);
            }
        }

        try{
            if(!Validar.CEP(cep)) return;

            updateCEP();
        }catch(erro){
            setCepError(erro?.message);
        }
    }, [cep]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const dados = {
            "nome": Validar.NomePF(nome) ? nome : '',
            "documento": Validar.CPF(documento) ? CPF.getOnlyDigits(documento) : Validar.CNPJ(documento) ? CNPJ.getOnlyDigits(documento) : '',
            "telefone": Validar.TelFixo(telefone) ? TelefoneFixo.getOnlyDigits(telefone) : '',
            "celular": Validar.TelCel(celular) ? TelefoneCelular.getOnlyDigits(celular) : '',
            "rua": Validar.NonEmptyField(rua) ? rua : '',
            "cidade": Validar.NonEmptyField(cidade) ? cidade : '',
            "bairro": Validar.NonEmptyField(bairro) ? bairro : '',
            "numero": Validar.NonEmptyField(numero) ? numero : '',
            "email": Validar.Email(email) ? email : '',
            "cep": Validar.CEP(cep) ? CEP.getOnlyDigits(cep) : '',
        }

        for(let property in dados){
            if(Str.isNotEmpty(dados[property]))
                continue;
            else
                return;
        }

        console.log(dados)

        fetch('http://localhost:3001/inicio/clientes/novo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
            mode: 'cors'
        })
        .then((resultado) => resultado.json())
        .then((response) => {
            console.log(response)
            if(response.success) {
                setShowAlert(true);
                setMsgAlert(`Cliente ${dados.nome} Cadastrado com sucesso!`);
                setTypeAlert("success");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setShowAlert(true);
                setTypeAlert("warning");
                setMsgAlert(`Erro ao cadastrar o cliente! ${cpfChecked?"CPF":"CNPJ"} já cadastrado!`);
            }
        })
        .catch((err) => {
            setShowAlert(true);
            setTypeAlert("danger");
            if(err instanceof TypeError && err.message === "Failed to fetch")
                setMsgAlert(`Verifique sua conexão com a internet (${err.message}).`);
            else
                setMsgAlert(err.message);
        });
    };

    return (
        <div id="cadcliente-main">
            <Alert 
                variant={typeAlert} 
                show={showAlert} 
                onClose={() => setShowAlert(false)} 
                dismissible
            >
                <strong><p>{msgAlert}</p></strong>
            </Alert>
             <Form id="cadcliente-form" onSubmit={handleSubmit}>
                <InputDadosCliente
                    required
                    doc={documento} docSetter={setDocumento} 
                    name={nome} nameSetter={setNome} 
                    tel={telefone} telSetter={setTelefone} 
                    cel={celular} celSetter={setCelular} 
                    email={email} emailSetter={setEmail}
                    cpfChecked={cpfChecked} cpfCheckedSetter={setCPFChecked}
                />
                <InputEndereco
                    required
                    cepSetter={setCep} cep={cep} cepErrorSetter={setCepError} cepError={cepError}
                    citySetter={setCidade} city={cidade}
                    neighborhoodSetter={setBairro}  neighborhood={bairro}
                    streetSetter={setRua} street={rua}
                    numberSetter={setNumero} number={numero}
                />

                <ButtonGroup>
                    <Button variant="primary" type="submit">Cadastrar</Button>
                    <Button variant="secondary" href="/inicio">Cancelar</Button>
                </ButtonGroup>
            </Form>
        </div>
    );
}
