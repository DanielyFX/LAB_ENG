import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Sidebar() {
    return (
        <div id="sidebar-container" className="sidebar">
            <Link to="/servicos" className="sidebar-link"><Button className="sidebar-button">Serviços</Button></Link>
            <Link to="/clientes" className="sidebar-link"><Button>Clientes</Button></Link>
            <Link to="/tecnicos" className="sidebar-link"><Button>Técnicos</Button></Link>
            <Link to="/chamados" className="sidebar-link"><Button>Chamados</Button></Link>
            <Link to="/atendentes" className="sidebar-link"><Button>Atendentes</Button></Link>
            <Link to="/servicos_realizados" className="sidebar-link"><Button>Realizados</Button></Link>
        </div>
    )
}