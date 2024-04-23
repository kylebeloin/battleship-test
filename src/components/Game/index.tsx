import {
  PropsWithChildren,
  createContext,
  useState,
  FC,
  useContext,
  useCallback,
} from "react";

import S from "./styles.module.css";
import { TileState } from "../Tile";

export interface IGame {
  started: boolean;
  start: (val: boolean) => void;
  tiles: Array<TileState>;
  setTile: (num: number, state: TileState) => void;
}

export const GameContext = createContext<IGame>({
  started: false,
  start: () => {},
  tiles: [],
  setTile: () => {},
});

export const useGame = () => {
  const context = useContext(GameContext);

  return context;
};

export const useGameContext = (): IGame => {
  const [started, setStarted] = useState<boolean>(false);
  const [tiles, setTiles] = useState<Array<TileState>>(
    Array.from({ length: 121 }).map((_) => TileState.None)
  );

  const setTile = useCallback(
    (num: number, state: TileState) => {
      const copy = [...tiles];
      copy[num] = state;
      setTiles(copy);
    },
    [tiles, setTiles]
  );

  return {
    start: (val: boolean) => setStarted(val),
    started,
    tiles,
    setTile,
  };
};

export const Game: FC<PropsWithChildren> = ({ children }) => {
  const value = useGameContext();
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
