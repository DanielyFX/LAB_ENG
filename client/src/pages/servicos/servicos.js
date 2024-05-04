import "../../css/servicos/servicos.css"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
export default function Servicos() {
    return (
        <div id="servicos-main" className="body-main">
            <Link to="/servicos/cadastrar"><Button>Cadastrar um serviço</Button></Link><br/><br/>
            <Link to="/servicos/consultar"><Button>Consultar serviços cadastrados</Button></Link><br/><br/>
            <Link to="/servicos/editar"><Button>Editar serviços</Button></Link><br/><br/>
        </div>
    )
}