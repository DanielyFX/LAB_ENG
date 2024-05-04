import "../../css/clientes/clientes.css"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
export default function Clientes() {
    return (
        <div id="clientes-main" className="body-main">
            <Link to="/clientes/cadastrar"><Button>Cadastrar um cliente</Button></Link><br/><br/>
            <Link to="/clientes/consultar"><Button>Consultar clientes cadastrados</Button></Link><br/><br/>
            <Link to="/clientes/editar"><Button>Editar cliente</Button></Link><br/><br/>
        </div>
    )
}