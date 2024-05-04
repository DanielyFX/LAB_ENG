import "../../css/chamados/chamados.css"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
export default function Chamados() {
    return (
        <div id="chamados-main" className="body-main">
            <Link to="/chamados/cadastrar"><Button>Cadastrar um chamado</Button></Link><br/><br/>
            <Link to="/chamados/consultar"><Button>Consultar chamados cadastrados</Button></Link><br/><br/>
            <Link to="/chamados/editar"><Button>Editar chamados</Button></Link><br/><br/>
        </div>
    )
}