import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TareaItem from "./components/TareaItem.jsx";

function App() {
  const [count, setCount] = useState(0)

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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={() => obtenerTareas()}>
          Consultar Tareas
        </button>

        <input value={descripcionTarea} onChange={(e) => setDescripcionTarea(e.target.value)} />
        <button onClick={() => guardarNuevaTarea()}>
          Agregar Nueva Tarea
        </button>

        {tareas.map(tarea => <TareaItem key={tarea.id} tarea={tarea}/>)}

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
