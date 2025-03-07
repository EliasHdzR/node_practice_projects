import {useState} from 'react'
import '../App.css'

export default function Registro() {

    const [username, setUsername] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [warningUsername, setWarningUsername] = useState("")
    const [warningName, setWarningName] = useState("")
    const [warningPassword, setWarningPassword] = useState("")
    const [warningConfPassword, setWarningConfPassword] = useState("")

    const registrarUsuario = async () => {
        const response = await fetch("http://127.0.0.1:3001/api/v1/accounts/new-user", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                nombre: nombre,
                apellidos: apellidos,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resData = await response.json()
        alert(resData.message)
        return {status: response.status}
    }

    function validarCampos() {
        let valido = true

        if (username.length === 0) {
            setWarningUsername("Ingrese un username")
            valido = false
        } else {
            setWarningUsername("")
        }

        if (nombre.length === 0) {
            setWarningName("Ingrese un nombre")
            valido = false
        } else {
            setWarningName("")
        }

        if (password.length === 0) {
            setWarningPassword("Ingrese un password")
            valido = false
        } else {
            setWarningPassword("")
        }

        if (confirmPassword.length === 0) {
            setWarningConfPassword("Confirme su password")
            valido = false
        } else {
            setWarningConfPassword("")
        }

        if (password !== confirmPassword) {
            setWarningConfPassword("Las passwords no coinciden")
            valido = false
        }

        if(!valido) return

        registrarUsuario().then(({status}) => {
            if (status == 400) setWarningUsername("Faltan datos obligatorios")
            if (status === 409) setWarningUsername("El usuario ya existe")
            if (status === 201) {
                setUsername("")
                setNombre("")
                setApellidos("")
                setPassword("")
                setConfirmPassword("")
            }
        })
    }

    return (
        <>
            <h1>Registro</h1>
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
                            <td style={{textAlign: "left"}}><label htmlFor="txt-name">Nombre</label></td>
                            <td>
                                <input type="text" name="name" id="txt-name"
                                       value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                            </td>
                            <td style={{textAlign: "left"}}>
                                <label id="warning-name" style={{color: "red"}}>{warningName}</label>
                            </td>
                        </tr>

                        <tr>
                            <td style={{textAlign: "left"}}><label htmlFor="txt-name">Apellidos</label></td>
                            <td>
                                <input type="text" name="name" id="txt-apellidos"
                                       value={apellidos} onChange={(e) => setApellidos(e.target.value)}/>
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
                            <td style={{textAlign: "left"}}><label htmlFor="txt-confirm-password">Confirmar Password</label></td>
                            <td>
                                <input type="password" name="confirm-password" id="txt-confirm-password"
                                       value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </td>
                            <td style={{textAlign: "left"}}>
                                <label id="warning-conf-password" style={{color: "red"}}>{ warningConfPassword }</label>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <input type="button" onClick={() => validarCampos()} value="REGISTRARSE"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
