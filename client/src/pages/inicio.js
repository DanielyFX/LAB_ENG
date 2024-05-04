import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import '../css/inicio.css';

export default function Inicio() {
    return (
        <>
            <div id="inicio-topo">
                <h1>Início</h1>
                <Button>Logout</Button>
            </div>
            <div id="inicio-container">
                <Link to="/servicos" className="inicio-link"><Button>Serviços</Button></Link>
                <Link to="/clientes" className="inicio-link"><Button>Clientes</Button></Link>
                <Link to="/tecnicos" className="inicio-link"><Button>Técnicos</Button></Link>
                <Link to="/chamados" className="inicio-link"><Button>Chamados</Button></Link>
                <Link to="/atendentes" className="inicio-link"><Button>Atendentes</Button></Link>
                <Link to="/servicos_realizados" className="inicio-link"><Button>Realizados</Button></Link>
            </div>
        </>
    );
}