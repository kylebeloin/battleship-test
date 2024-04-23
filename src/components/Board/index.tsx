import { FC } from "react";
import { Tile } from "../Tile";
import S from "./styles.module.css";
import { useGame } from "../Game";

const W = 11;

interface IPoint {
  x: number;
  y: number;
}

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const isFirst = ({ x, y }: IPoint) => x === 0 && y === 0;

const isLetter = ({ y }: IPoint) => y === 0;

const isNumber = ({ x }: IPoint) => x === 0;

function getCoords(num: number) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      arr.push({ x: i, y: j });
    }
  }
  return arr;
}

export const Board: FC = () => {
  const { start, started } = useGame();
  const coords = getCoords(W);
  return (
    <>
      <div className={S.board}>
        {coords.map((coord, i) => {
          if (isFirst(coord)) return <div />;
          if (isLetter(coord)) {
            return <div className={S.letter}>{letters[coord.x - 1]}</div>;
          }
          if (isNumber(coord)) {
            return <div className={S.letter}>{i}</div>;
          }
          return <Tile number={i} key={`tile-${i}`} />;
        })}
      </div>
      <button onClick={() => start(!started)}>
        {started ? "Reset" : "Start"}
      </button>
    </>
  );
};
