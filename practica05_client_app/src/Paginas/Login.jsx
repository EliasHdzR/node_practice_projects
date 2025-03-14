import {useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [warningUsername, setWarningUsername] = useState("")
    const [warningPassword, setWarningPassword] = useState("")

    const login = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/account/login/", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resData = await response.json()
        return {status: response.status, resData}
    }

    function validarCampos() {
        let valido = true

        if (username.trim() === "") {
            setWarningUsername("Ingrese un username")
            setUsername("")
            valido = false
        } else {
            setWarningUsername("")
        }

        if (password.length === 0) {
            setWarningPassword("Ingrese un password")
            valido = false
        } else {
            setWarningPassword("")
        }

        if(!valido) return;

        login().then(({status, resData}) => {
            if (status == 400) setWarningUsername("Faltan datos obligatorios")
            if (status === 401) setWarningUsername("Credenciales inválidas")
            if (status === 200) {
                localStorage.setItem("accessToken", resData.access_token)
                localStorage.setItem("refreshToken", resData.refresh_token)
                navigate('/perfil')
            }
        })
    }

    return(
        <>
            <h1>Iniciar Sesión</h1>
            <div className="card">
                <table>
                    <tbody>
                    <tr>
                        <td style={{textAlign: "left"}}><label htmlFor="txt-username">Username</label></td>
                        <td>
                            <input type="text" name="username"
                                   value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </td>
                        <td style={{textAlign: "left"}}>
                            <label id="warning-username" style={{color: "red"}}>{ warningUsername }</label>
                        </td>
                    </tr>

                    <tr>
                        <td style={{textAlign: "left"}}><label htmlFor="txt-password">Password</label></td>
                        <td>
                            <input type="password" name="password" id="txt-password"
                                   value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </td>
                        <td style={{textAlign: "left"}}>
                            <label id="warning-password" style={{color: "red"}}>{ warningPassword }</label>
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <input type="button" onClick={() => validarCampos()} value="INICIAR SESIÓN"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}