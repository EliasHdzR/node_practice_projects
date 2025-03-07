import {BrowserRouter, useRoutes} from "react-router-dom";
import './App.css'
import Game from "./Paginas/Game.jsx";
import NavBar from "./Components/NavBar.jsx";
import Home from "./Paginas/Home.jsx";
import PvEGame from "./Paginas/PvEGame.jsx";
import ToDo from "./Paginas/ToDo.jsx";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home/> },
    { path: "/pvp", element: <Game/> },
    { path: "/pve", element: <PvEGame/> },
    { path: "/todo", element: <ToDo/> }
  ]);

  return routes;
}

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  );
}

export default App
