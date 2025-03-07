import {NavLink} from "react-router-dom";

export default function NavBar(){
    return(
        <nav>
            <ul style={{display: "flex", flexDirection: "row", listStyleType: "none", gridGap: "10px"}}>
                <li><NavLink to="/">Tareas</NavLink></li>
                <li><NavLink to="/registro">Registro</NavLink></li>
            </ul>
        </nav>
    );
}