import { useState } from "react";
import { Game } from "./components/Game";
import { Board } from "./components/Board";
import S from "./App.css";

const W: number = 10;
const H: number = 10;

function Tile() {}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Game>
      <Board />
    </Game>
  );
}

export default App;
