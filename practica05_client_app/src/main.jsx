import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavBar from "./components/NavBar.jsx";
import {BrowserRouter, useRoutes} from "react-router-dom";
import Registro from "./Paginas/Registro.jsx";
import Login from "./Paginas/Login.jsx";
import Perfil from "./Paginas/Perfil.jsx";
import Logout from "./Paginas/Logout.jsx";

const AppRoutes = () => {
    return useRoutes([
        {path: "/", element: <App/>},
        {path: "/registro", element: <Registro/>},
        {path: "/login", element: <Login/>},
        {path: "/perfil", element: <Perfil/>},
        {path: "/logout", element: <Logout/>},
    ]);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <NavBar/>
          <AppRoutes>
              <App/>
          </AppRoutes>
      </BrowserRouter>
  </StrictMode>,
)
