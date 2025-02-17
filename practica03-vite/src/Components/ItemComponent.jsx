/* eslint-disable react/prop-types */
export default function ItemComponent({data}) {
  return(
    <div>
      <h3>{data.nombre} (Id {data.id})</h3>
      <p>{data.descripcion}</p>
    </div>
  );
}