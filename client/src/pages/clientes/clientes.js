import "../../css/clientes/clientes.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {ButtonGroup, Dropdown, InputGroup} from "react-bootstrap";
import ClienteModal from "../../components/ClienteModal";
import searchIcon from "../../css/Icons";
import Alert from 'react-bootstrap/Alert';
import { 
    CadastroPessoaFisica as CPF,
    CadastroNacionalPessoaJuridica as CNPJ,
    TelefoneCelular as TelCel,
    TelefoneFixo as TelFixo,
    CEP,
    Data
} from "../validacao";

function ClienteBox(props) {
    const [show, setShow] = useState(false);
    const {setMsgAlert, setShowAlert, setTypeAlert} = props;
    const {cliente} = props;

    const handleInativar = (cliente_id) => {
        fetch('http://localhost:3001/inicio/clientes/inativar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({cliente_id})
        })
        .then((resultado) => resultado.json())
        .then((response) => {
            if (response.success){
                if(setShowAlert && setMsgAlert && setTypeAlert){
                    setShowAlert(true);
                    setMsgAlert(`Cliente inativado com sucesso`);
                    setTypeAlert("success");
                }
                // console.log(`Resposta: ${response.success}`);
                setTimeout(() => {
                    window.location.reload();  
                }, 2000);
            }else if(setShowAlert && setMsgAlert && setTypeAlert){
                setShowAlert(true);
                setMsgAlert(`Não foi possível inativar o cliente`);
                setTypeAlert("info");
            }
        })
        .catch((err) => {
            if(setShowAlert && setMsgAlert && setTypeAlert){
                setShowAlert(true);
                setTypeAlert('danger');
                if(err instanceof TypeError && err.message === "Failed to fetch")
                    setMsgAlert(`Erro: Verifique sua conexão com a internet (${err.message}).`);
                else
                    setMsgAlert(`Erro: ${err.message}`);
            }else{
                console.error(err);
            }
        });
    };

    return (
        <div className="tecnico">
            <p key={`${cliente._id}`}>ID: {cliente._id}</p><hr/>
            <p key={`${cliente._id}_nome`}>NOME: {cliente.nome}</p><hr/>
            <p key={`${cliente._id}_documento`}>{CPF.isFormatValid(cliente.documento)? "CPF" : "CNPJ"}: {CPF.isFormatValid(cliente.documento)?CPF.getFormated(cliente.documento):CNPJ.getFormated(cliente.documento)}</p><hr/>
            <p key={`${cliente._id}_email`}>EMAIL: {cliente.email}</p><hr/>
            <p key={`${cliente._id}_telefone`}>TELEFONE: {TelFixo.getFormated(cliente.telefone)}</p><hr/>
            <p key={`${cliente._id}_celular`}>CELULAR: {TelCel.getFormated(cliente.celular)}</p><hr/>
            <p key={`${cliente._id}_cep`}>CEP: {CEP.getFormated(cliente.cep)}</p><hr/>
            <p key={`${cliente._id}_rua`}>RUA: {cliente.rua}</p><hr/>
            <p key={`${cliente._id}_bairro`}>BAIRRO: {cliente.bairro}</p><hr/>
            <p key={`${cliente._id}_numero`}>NUMERO: {cliente.numero}</p><hr/>
            <p key={`${cliente._id}_cidade`}>CIDADE: {cliente.cidade}</p><hr/>
            <p key={`${cliente._id}_dataCriacao`}>DATA CRIAÇÃO: {Data.getOnlyDateBRFormat(cliente.dataCriacao)}</p><hr/>
            <ButtonGroup>
                <Button onClick={() => {setShow(true)}}>Editar</Button>
                {cliente.bd_status !== "INATIVO" && (
                    <Button variant="danger" onClick={() => handleInativar(cliente._id)}>Inativar</Button>
                )}
            </ButtonGroup>
            <ClienteModal 
                show={show} 
                cliente={cliente} 
                onHide={() => setShow(false)} 
                handleClose={() => setShow(false)}
                setMsgAlert={setMsgAlert} 
                setShowAlert={setShowAlert} 
                setTypeAlert={setTypeAlert}
            />
        </div>
    )

}


export default function ConsultarClientes() {

    let clientes = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("nome");
    const [parametroOrd, setParametroOrd] = useState("nome");

    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');

    const dropdown = (dropdown) => {
        let funcao, todos = true;
        if (dropdown === "ord") {
            todos = false
            funcao = setParametroOrd;
        } else funcao = setParametro;
        return (
            <Dropdown.Menu>
                {todos && <Dropdown.Item as="button" onClick={() => funcao("todos")}>Todos os Campos</Dropdown.Item>}
                {todos && <Dropdown.Item as="button" onClick={() => funcao("_id")}>ID</Dropdown.Item>}
                <Dropdown.Item as="button" onClick={() => funcao("nome")}>Nome</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("dataCriacao")}>Data de Criação</Dropdown.Item>
                {todos && <Dropdown.Item as="button" onClick={() => funcao("documento")}>CPF/CNPJ</Dropdown.Item>}
                {todos && <Dropdown.Item as="button" onClick={() => funcao("telefone")}>Telefone</Dropdown.Item>}
                {todos && <Dropdown.Item as="button" onClick={() => funcao("celular")}>Celular</Dropdown.Item>}
                {todos && <Dropdown.Item as="button" onClick={() => funcao("email")}>Email</Dropdown.Item>}
                <Dropdown.Item as="button" onClick={() => funcao("cep")}>CEP</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("rua")}>Rua</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("numero")}>Numero</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("bairro")}>Bairro</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("cidade")}>Cidade</Dropdown.Item>
            </Dropdown.Menu>
        )
    }

    const sort_string = (a, b) => {
        return a > b ? a === b ? 1 : 0 : -1;
    }

    return (
        <div className="body-main">
            <Alert 
                variant={typeAlert} 
                show={showAlert} 
                onClose={() => setShowAlert(false)} 
                dismissible
            >
                <strong><p>{msgAlert}</p></strong>
            </Alert>
            <InputGroup className="mb-3">
                <InputGroup.Text style={{ opacity: 0.5 }} >{searchIcon}</InputGroup.Text>
                <Form.Control placeholder='Buscar...' onChange={e => setPesquisa(e.target.value)}/>
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        Filtro de Pesquisa: {parametro}
                    </Dropdown.Toggle>
                    {dropdown("")}
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        Filtro de Ordenação: {parametroOrd}
                    </Dropdown.Toggle>
                    {dropdown("ord")}
                </Dropdown>
            </InputGroup>
            <div id="chamados-main">
                {clientes.length > 0 && clientes
                    .filter((cliente) => cliente.bd_status !== "INATIVO")
                    .filter((cliente) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in cliente) {
                                    if (cliente[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true;
                                }
                                return false;
                            case "_id":
                                return cliente._id.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "nome":
                                return cliente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "dataCriacao":
                                return cliente.dataCriacao.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "documento":
                                return cliente.documento.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "celular":
                                return cliente.celular.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "telefone":
                                return cliente.telefone.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "email":
                                return cliente.email.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "cep":
                                return cliente.cep.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "rua":
                                return cliente.rua.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "numero":
                                return cliente.numero.toString().toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "bairro":
                                return cliente.bairro.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "cidade":
                                return cliente.cidade.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            default:
                                return true;
                        }
                    }).sort((a,b) => {
                        switch (parametroOrd) {
                            case "nome":
                            case "email":
                            case "documento":
                            case "_id":
                            case "rua":
                            case "bairro":
                            case "cidade":
                                return sort_string(a[parametroOrd], b[parametroOrd]);
                            case "cep":
                            case "numero":
                            case "telefone":
                            case "celular":
                                return parseInt(a["cpf"]) - parseInt(b["cpf"]);
                            case "dataCriacao":
                                return new Date(a["dataCriacao"]) - new Date(b["dataCriacao"]);
                            default:
                                return true;
                        }
                    }).map((cliente) => {
                        return (
                            <ClienteBox 
                                key={`${cliente._id}-box`} 
                                cliente={cliente} 
                                setMsgAlert={setMsgAlert} 
                                setShowAlert={setShowAlert} 
                                setTypeAlert={setTypeAlert} 
                            />
                        );
                    })
                }
            </div>
        </div>
    )
}
