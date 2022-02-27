import React, { useContext, useEffect, useState } from "react";

type GameLogicContext = {
  gameState: number[][];
  onSwipeLeft: undefined | ((cellRow: number, cellColumn: number) => void);
  onSwipeRight: undefined | ((cellRow: number, cellColumn: number) => void);
  onSwipeUp: undefined | ((cellRow: number, cellColumn: number) => void);
  onSwipeDown: undefined | ((cellRow: number, cellColumn: number) => void);
};

const initialState = [
  [NaN, NaN, NaN, NaN],
  [NaN, NaN, NaN, NaN],
  [NaN, NaN, NaN, NaN],
  [NaN, NaN, NaN, NaN],
];

const _2048Context = React.createContext({
  gameState: initialState,
  onSwipeLeft: undefined,
} as GameLogicContext);

const { Provider } = _2048Context;
export function _GameLogicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameState, setGameState] = useState(initialState);

  const updateGameState = (
    oldState: number[][],
    row: number,
    column: number,
    value: number
  ) => {
    let newState: number[][] = [];

    oldState.forEach((row) => {
      newState.push(row);
    });

    newState[row][column] = value;
    console.log(newState);
    setGameState(newState);
  };

  const getRandomEmptyCell = (
    gState: number[][]
  ): { row: number; col: number } => {
    let r = -1,
      c = -1;
    gState.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        if (isNaN(cell)) {
          r = ri;
          c = ci;
        }
      });
    });
    return { row: r, col: c };
  };

  const cloneGameState = (): number[][] => {
    let clonedState: number[][] = [];
    gameState.forEach((row) => {
      clonedState.push(row.concat([]));
    });
    return clonedState;
  };

  const spaceLeft = (boardState: number[][]): boolean => {
    let spaceLeft = false;
    for (let ri = 0; ri < boardState.length; ri++) {
      for (let ci = 0; ci < boardState[ri].length; ci++) {
        if (isNaN(boardState[ri][ci])) {
          spaceLeft = true;
        }
      }
    }
    return spaceLeft;
  };

  const updateStateOnHorizontalSwipe = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        let updatedState = cloneGameState();

        break;
      case "right":
        let _updatedState = cloneGameState();

        break;
    }
  };

  const updateStateOnVerticalSwipe = (direction: "up") => {
    switch (direction) {
      case "up":
        let _cloneState = cloneGameState();
        for (let column = 0; column < _cloneState[0].length; column++) {
          for (let colIndex = 0; colIndex < _cloneState[0].length; colIndex++) {
            let next = colIndex + 1;
            while (
              next < _cloneState[0].length &&
              (isNaN(_cloneState[column][next]) ||
                _cloneState[column][next] !== _cloneState[column][colIndex])
            ) {
              next++;
            }

            if (
              next < _cloneState[0].length &&
              _cloneState[column][colIndex] === _cloneState[column][colIndex]
            ) {
              _cloneState[column][colIndex] = _cloneState[column][colIndex] * 2;
              _cloneState[column][next] = NaN;
            }
            // 1 2 . 5
            // . . 4 .
            let toShift = 0;
            for (let rebase = 0; rebase < _cloneState[0].length; rebase++) {
              if (!isNaN(_cloneState[column][rebase])) {
                toShift++;
              }
            }

            // clear sort acc to direction
            for (let rebase = 0; rebase < toShift; rebase++) {

            }
          }
        }
    }
  };

  const onSwipeLeft = (cellRow: number, cellColumn: number) => {
    if (spaceLeft(gameState)) {
      console.log(
        `Left ${cellRow} ${cellColumn}: ${gameState[cellRow][cellColumn]}`
      );
      updateStateOnHorizontalSwipe("left");
    }
  };

  const onSwipeRight = (cellRow: number, cellColumn: number) => {
    if (spaceLeft(gameState)) {
      console.log(
        `Right ${cellRow} ${cellColumn}: ${gameState[cellRow][cellColumn]}`
      );
      updateStateOnHorizontalSwipe("right");
    }
  };

  const onSwipeUp = (cellRow: number, cellColumn: number) => {
    console.log(
      `Up ${cellRow} ${cellColumn}: ${gameState[cellRow][cellColumn]}`
    );
    if (spaceLeft(gameState)) {
      console.log(
        `Right ${cellRow} ${cellColumn}: ${gameState[cellRow][cellColumn]}`
      );
      updateStateOnVerticalSwipe("up");
    }
  };

  const onSwipeDown = (cellRow: number, cellColumn: number) => {
    console.log(
      `Down ${cellRow} ${cellColumn}: ${gameState[cellRow][cellColumn]}`
    );
  };

  useEffect(() => {
    const randomRow = Math.floor(Math.random() * 3);
    const randomCol = Math.floor(Math.random() * 3);

    updateGameState(gameState, randomRow, randomCol, 2);
  }, []);

  return (
    <Provider
      value={{ gameState, onSwipeLeft, onSwipeRight, onSwipeDown, onSwipeUp }}
    >
      {children}
    </Provider>
  );
}

export function useGameLogic(): GameLogicContext {
  return useContext(_2048Context);
}
