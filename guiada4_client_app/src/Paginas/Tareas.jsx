import {useState} from 'react'
import '../App.css'
import TareaItem from "../components/TareaItem.jsx";

function App() {
    const [tareas, setTareas] = useState([])
    const [descripcionTarea, setDescripcionTarea] = useState("")

    const obtenerTareas = async () => {
        const response = await fetch("http://127.0.0.1:3001/api/v1/tareas")
        const resDatos = await response.json()
        setTareas(resDatos)
    }

    const guardarNuevaTarea = async () => {
        const response = await fetch("http://127.0.0.1:3001/api/v1/tareas", {
            method: "POST",
            body: JSON.stringify({
                descripcion: descripcionTarea,
                fechaRegistro: "2025-02-28T10:25:00",
                fechaCaduca: null
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resData = await response.json()
        alert(`${resData.message} || Id Tarea: ${resData.idTarea}`)
    }

    return (
        <>
            <h1>Tareas</h1>
            <div className="card">
                <button onClick={() => obtenerTareas()}>
                    Consultar Tareas
                </button>
                <input value={descripcionTarea} onChange={(e) => setDescripcionTarea(e.target.value)}/>
                <button onClick={() => guardarNuevaTarea()}>
                    Agregar Nueva Tarea
                </button>

                {tareas.map(tarea => <TareaItem key={tarea.id} tarea={tarea}/>)}
            </div>
        </>
    )
}

export default App
