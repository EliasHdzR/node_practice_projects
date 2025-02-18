/* eslint-disable react/prop-types */
export default function ItemComponent({data}) {
  const btnAccion = () => {
    alert(`Hola desde item ${data.nombre}`);
  }

  return(
    <div>
      <h3>{data.nombre} (Id {data.id})</h3>
      <p>{data.descripcion}</p>
      <button onClick={btnAccion}>Acción del item</button>
    </div>
  );
}