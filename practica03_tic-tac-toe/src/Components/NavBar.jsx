import {NavLink} from "react-router-dom";

export default function NavBar(){
  return(
    <nav>
      <ul style={{display: "flex", flexDirection: "row", listStyleType: "none", gridGap: "10px"}}>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/pvp">Gato PvP</NavLink></li>
        <li><NavLink to="/pve">Gato PvE</NavLink></li>
        <li><NavLink to="/todo">To-Do List</NavLink></li>
      </ul>
    </nav>
  );
}