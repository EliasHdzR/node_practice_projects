export default function Square({value, onSquareClick}) {
  return (
    <button className="square" style={{width: "40px",
      height: "40px",
      fontWeight: "bold",
      alignItems: "center",
      padding: "0",
      justifyContent: "center"}} onClick={onSquareClick}>
      { value }
    </button>
  );
}