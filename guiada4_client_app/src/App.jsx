import {BrowserRouter, useRoutes} from "react-router-dom";
import './App.css'
import Tareas from "./Paginas/Tareas.jsx";
import Registro from "./Paginas/Registro.jsx";
import NavBar from "./components/NavBar.jsx";

const AppRoutes = () => {
    return useRoutes([
        {path: "/", element: <Tareas/>},
        {path: "/registro", element: <Registro/>},
    ]);
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
