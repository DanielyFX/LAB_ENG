import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import '../css/header.css'

export default function Header(props) {
    return (
        <div id="header-div">
            <h1>{props.titulo}</h1>
            <div>
                <Link className="header-botoes" to="/"><Button>Logout</Button></Link>
                <Link className="header-botoes" to="/inicio"><Button>Inicio</Button></Link>
            </div>
        </div>
    )
}