import Board from "../Components/Board.jsx";
import {useState} from "react";

export default function PvEGame() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const pcSquares = PCPlay(nextSquares);
    const updatedHistory = [...nextHistory, pcSquares];
    setHistory(updatedHistory);
    setCurrentMove(updatedHistory.length - 1);
  }

  function PCPlay(squares) {
    const nextSquares = squares.slice();

    const availableSquares = [];
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) availableSquares.push(i);
    }

    if (availableSquares.length === 0) return nextSquares;

    const i = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    nextSquares[i] = "O";
    return nextSquares;
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? "Ir al movimiento #" + move : "Ir al inicio del juego";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <h1>Gato PvE</h1>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
    </>
  );
}
