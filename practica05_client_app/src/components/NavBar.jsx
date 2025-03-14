import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

    useEffect(() => {
        const updateTokens = () => {
            setToken(localStorage.getItem("accessToken"));
            setRefreshToken(localStorage.getItem("refreshToken"));
        };

        updateTokens();
        window.addEventListener("storage", updateTokens);
    },); // Solo se ejecuta una vez cuando el componente se monta

    return (
        <nav className="navbar">
            <ul>
                <div>
                    <li><NavLink style={{ color: "whitesmoke" }} to="/">Home</NavLink></li>
                </div>
                <div style={{ display: "flex", gap: "25px" }}>
                    {token && refreshToken ? (
                        <>
                            <li><NavLink style={{ color: "whitesmoke" }} to="/logout">Cerrar Sesión</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink style={{ color: "whitesmoke" }} to="/registro">Registro</NavLink></li>
                            <li><NavLink style={{ color: "whitesmoke" }} to="/login">Iniciar Sesión</NavLink></li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    );
}
