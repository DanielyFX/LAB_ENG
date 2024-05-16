import "../../css/chamados/chamados.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {Dropdown, InputGroup} from "react-bootstrap";
import ChamadoModal from "../../components/ChamadoModal";
export default function Consultar_Chamados(props) {

    let { chamados } = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("chamado");
    const [parametroOrd, setParametroOrd] = useState("chamado");
    const [chamado, setChamado] = useState(0);
    const [show, setShow] = useState(false);

    const sort_string = (a, b) => {
        return a > b ? a === b ? 1 : 0 : -1;
    }

    return (
        <div className="body-main">
            <InputGroup className="mb-3">
                <Form.Control onChange={e => setPesquisa(e.target.value)}/>
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        parâmetro de pesquisa: {parametro}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={() => setParametro("todos")}>todos os campos</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametro("_id")}>_id</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametro("chamado")}>chamado</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametro("urgencia")}>urgencia</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametro("orcamento")}>orçamento</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametro("data")}>data</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametro("atendente")}>atendente</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametro("cliente")}>cliente</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        parâmetro de ordenação: {parametroOrd}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={() => setParametroOrd("todos")}>todos os campos</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametroOrd("_id")}>_id</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametroOrd("chamado")}>chamado</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametroOrd("urgencia")}>urgencia</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametroOrd("orcamento")}>orçamento</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametroOrd("data")}>data</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametroOrd("atendente")}>atendente</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setParametroOrd("cliente")}>cliente</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </InputGroup>
            <div id="chamados-main">
                {
                    chamados.filter((chamado) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in chamado) {
                                    if (chamado[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                break;
                            case "_id":
                                return chamado._id.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "chamado":
                                return chamado.chamado.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "urgencia":
                                return chamado.urgencia.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "orcamento":
                                return chamado.orcamento.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "data":
                                return chamado.previsao_atendimento.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "atendente":
                                return chamado.atendente_id.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "cliente":
                                return chamado.cliente_id.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            default:
                                return true;
                        }
                    }).sort((a,b) => {
                        console.log(parametroOrd);
                        switch (parametroOrd) {
                            case "chamado":
                            case "urgencia":
                            case "orcamento":
                            case "atendente":
                            case "cliente":
                                sort_string(a[parametroOrd], b[parametroOrd]);
                                break;
                            case "_id":
                                return parseInt(a["_id"]) - parseInt(b["_id"])
                            case "data":
                                return new Date(a["previsao_atendimento"]) - new Date(b["previsao_atendimento"]);
                            default:
                                return true;
                        }
                    }).map((chamado, key) => {
                        return (
                            <div className="chamado">
                                <p key={`${chamado.id}_chamado`}>CHAMADO: {chamado.chamado}</p>
                                <p key={`${chamado.id}`}>ID: {chamado._id}</p>
                                <p key={`${chamado.id}_urgencia`}>URGENCIA: {chamado.urgencia}</p>
                                <p key={`${chamado.id}_status`}>STATUS ORÇAMENTO: {chamado.orcamento}</p>
                                <p key={`${chamado.id}_data`}>DATA PREVISTA: {chamado.previsao_atendimento}</p>
                                <p key={`${chamado.id}_atendente`}>ATENDENTE: {chamado.atendente_id}</p>
                                <p key={`${chamado.id}_cliente`}>CLIENTE: {chamado.cliente_id}</p>
                                <Button onClick={() => {
                                    setChamado(key)
                                    setShow(true)
                                }}>Editar</Button>
                            </div>
                        );
                    })
                }
            </div>
            <ChamadoModal show={show} chamados={chamados} chamado_key={chamado} onHide={() => setShow(false)} handleClose={() => setShow(false)}/>
        </div>
    )
}