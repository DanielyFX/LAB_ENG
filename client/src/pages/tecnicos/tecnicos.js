import "../../css/tecnicos/tecnicos.css"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
export default function Tecnicos() {
    return (
        <div id="servicos-main" className="body-main">
            <Link to="/tecnicos/cadastrar"><Button>Cadastrar um tecnico</Button></Link><br/><br/>
            <Link to="/tecnicos/consultar"><Button>Consultar tecnicos cadastrados</Button></Link><br/><br/>
            <Link to="/tecnicos/editar"><Button>Editar tecnicos</Button></Link><br/><br/>
        </div>
    )
}