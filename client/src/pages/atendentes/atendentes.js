import "../../css/atendentes/atendentes.css"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
export default function Atendentes() {
    return (
        <div id="atendentes-main" className="body-main">
            <Link to="/atendentes/cadastrar"><Button>Cadastrar um atendente</Button></Link><br/><br/>
            <Link to="/atendentes/consultar"><Button>Consultar atendentes cadastrados</Button></Link><br/><br/>
            <Link to="/atendentes/editar"><Button>Editar atendente</Button></Link><br/><br/>
        </div>
    )
}