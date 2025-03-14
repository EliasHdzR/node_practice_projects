import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function Perfil() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("accessToken"))
    const refreshToken = localStorage.getItem("refreshToken")

    const [id, setId] = useState("")
    const [username, setUsername] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [tipo_usuario, setTipoUsuario] = useState("")

    const getPerfil = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/account/perfil/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                await refreshTokenFn();
                return;
            }

            const resData = await response.json();
            setProfileData(resData[0]);
        } catch (error) {
            navigate("/login");
        }
    };

    const refreshTokenFn = async () => {
        if (!refreshToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/account/refresh-token/", {
                method: "POST",
                body: JSON.stringify({
                    refresh_token: refreshToken
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const resData = await response.json();

            if (response.status === 200) {
                localStorage.setItem("accessToken", resData.access_token);
                setToken(resData.access_token);
            } else {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate('/login');
            }
        } catch (error) {
            console.error("Error en refreshTokenFn:", error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate('/login');
        }
    };

    const setProfileData = (resData) => {
        setId(resData.id);
        setUsername(resData.username);
        setNombre(resData.nombre);
        setApellido(resData.apellido);
        setTipoUsuario(resData.tipo_usuario);
    };

    useEffect(() => {
        getPerfil();
    });

    return(
        <>
            <h1>Mi Perfil</h1>
            <div className="card">
                <table>
                    <tbody>
                    <tr>
                        <td style={{textAlign: "left"}}><label>ID</label></td>
                        <td><label>{ id }</label></td>
                    </tr>

                    <tr>
                        <td style={{textAlign: "left"}}><label>Username</label></td>
                        <td><label>{ username }</label></td>
                    </tr>

                    <tr>
                        <td style={{textAlign: "left"}}><label>Nombre</label></td>
                        <td><label>{ nombre }</label></td>
                    </tr>

                    <tr>
                        <td style={{textAlign: "left"}}><label>Apellido</label></td>
                        <td><label>{ apellido }</label></td>
                    </tr>

                    <tr>
                        <td style={{textAlign: "left"}}><label>Tipo de Usuario</label></td>
                        <td><label>{ tipo_usuario }</label></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}