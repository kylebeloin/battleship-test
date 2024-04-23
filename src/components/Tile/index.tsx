import S from "./styles.module.css";
import { FC, useCallback, useState } from "react";
import { useGame } from "../Game";

export enum TileState {
  Ship = "ship",
  Hit = "hit",
  Miss = "miss",
  None = "none",
}

interface ITileProps {
  number: number;
}

export const Tile: FC<ITileProps> = ({ number }) => {
  const { setTile, tiles, started } = useGame();
  const [state, setState] = useState<TileState>(tiles[number]);

  const handleClick = useCallback(() => {
    // if started, we're looking for ships. ignore unset ships.
    if (started) {
      // if started and a ship, toggle between ship and hit
      if (state === TileState.Ship) {
        setState(TileState.Hit);
        return setTile(number, TileState.Hit);
      }
      if (state === TileState.Hit) {
        setState(TileState.Ship);
        return setTile(number, TileState.Ship);
      }
      if (state === TileState.None) {
        setState(TileState.Miss);
        return setTile(number, TileState.Miss);
      }
      if (state === TileState.Miss) {
        setState(TileState.None);
        return setTile(number, TileState.None);
      }
    } else {
      if (state === TileState.Ship) {
        setState(TileState.None);
        return setTile(number, TileState.None);
      } else {
        setState(TileState.Ship);
        return setTile(number, TileState.Ship);
      }
    }
  }, [started, state]);
  return (
    <div className={`${S.tile} ${S?.[state]}`} onClick={handleClick}></div>
  );
};
