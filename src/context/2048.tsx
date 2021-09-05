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
export function _GameLogicProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState(initialState);

    const updateGameState = (oldState: number[][], row: number, column: number, value: number) => {
        let newState: number[][] = [];

        oldState.forEach((row) => {
            newState.push(row);
        });

        newState[row][column] = value;
        console.log(newState)
        setGameState(newState);
    };

    const getRandomEmptyCell = (gState: number[][]): { row: number, col: number} => {
        let r = -1, c = -1;
        gState.forEach((row, ri) => {
            row.forEach((cell, ci) => {
                if (isNaN(cell)) {
                    r = ri
                    c = ci
                }
            })
        })
        return { row: r, col: c }
    }

    const cloneGameState = (): number[][] => {
        let clonedState: number[][] = [];
        gameState.forEach(row => {
            clonedState.push(row);
        })
        return clonedState;
    }

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
    }

    const updateStateOnHorizontalSwipe = (direction: "left" | "right") => {
        switch (direction) {
            case "left":
                let updatedState = cloneGameState();
                for (let rowIterator = 0; rowIterator < gameState.length; rowIterator++) {
                    for (let colIterator = gameState[rowIterator].length - 1; colIterator > 0; colIterator--) {
                        if (colIterator >= 1 && gameState[rowIterator][colIterator] === gameState[colIterator][rowIterator - 1]) {
                            gameState[rowIterator][colIterator - 1] = gameState[rowIterator][colIterator] * gameState[rowIterator][colIterator - 1];
                            gameState[rowIterator][colIterator] = NaN;
                        }
                    }
                }
                const { row, col } = getRandomEmptyCell(updatedState);
                if (row !== -1 && col !== -1) {
                    updateGameState(updatedState, row, col, 2);
                }
                break;
            case "right":
                let _updatedState = cloneGameState();
                for (let rowIterator = 0; rowIterator < gameState.length; rowIterator++) {
                    for (let colIterator = gameState[rowIterator].length - 1; colIterator > 0; colIterator--) {
                        if (colIterator >= 1 && gameState[rowIterator][colIterator] === gameState[colIterator][rowIterator - 1]) {
                            gameState[rowIterator][colIterator - 1] = gameState[rowIterator][colIterator] * gameState[rowIterator][colIterator - 1];
                            gameState[rowIterator][colIterator] = NaN;
                        }
                    }
                }
                const eCell = getRandomEmptyCell(_updatedState);
                if (eCell.row !== -1 && eCell.col !== -1) {
                    updateGameState(_updatedState, eCell.row, eCell.col, 2);
                }
        }
    }

    const onSwipeLeft = (cellRow: number, cellColumn: number) => {
        if (spaceLeft(gameState)) {
            console.log(`Left ${cellRow} ${cellColumn}: ${gameState[cellRow][cellColumn]}`);
            updateStateOnHorizontalSwipe("left");
        }
    };

    const onSwipeRight = (cellRow: number, cellColumn: number) => {
        if (spaceLeft(gameState)) {
            console.log(`Right ${cellRow} ${cellColumn}: ${gameState[cellRow][cellColumn]}`);
            updateStateOnHorizontalSwipe("right");
        }
    };

    const onSwipeUp = (cellRow: number, cellColumn: number) => {
        console.log(`Up ${cellRow} ${cellColumn}: ${gameState[cellRow][cellColumn]}`);
    };

    const onSwipeDown = (cellRow: number, cellColumn: number) => {
        console.log(`Down ${cellRow} ${cellColumn}: ${gameState[cellRow][cellColumn]}`);
    };

    useEffect(() => {
        const randomRow = Math.floor(Math.random() * 3);
        const randomCol = Math.floor(Math.random() * 3);

        updateGameState(gameState, randomRow, randomCol, 2);
    }, []);

    return (
        <Provider value={{ gameState, onSwipeLeft, onSwipeRight, onSwipeDown, onSwipeUp }}>
            {children}
        </Provider>
    );
}

export function useGameLogic(): GameLogicContext {
    return useContext(_2048Context);
}
