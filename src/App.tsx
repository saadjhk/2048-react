import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGameLogic } from "./context/2048";

function App() {
    const { gameState, onSwipeRight, onSwipeDown, onSwipeLeft, onSwipeUp } = useGameLogic();
    const [selectedCell, setSelectedCell] = useState({ row: -1, column: -1 });

    return (
        <div className="App">
            <div>
                {gameState.map((row) => {
                    return <div>{row.map((stateVal) => (isNaN(stateVal) ? "-" : stateVal)).join(" ")}</div>;
                })}
            </div>

            <div>
                <input
                    type="number"
                    name="input-row"
                    id="input-row"
                    placeholder="Row"
                    onChange={(evt) => {
                        let row = +evt.target.value;
                        row >= 1 && row <= 4
                            ? setSelectedCell((state) => {
                                  state.row = row;
                                  return state;
                              })
                            : console.error(new Error("Invalid input."));
                    }}
                />
                <input
                    type="number"
                    name="input-column"
                    id="input-column"
                    placeholder="Column"
                    onChange={(evt) => {
                        let col = +evt.target.value;
                        col >= 1 && col <= 4
                            ? setSelectedCell((state) => {
                                  state.column = col;
                                  return state;
                              })
                            : console.error(new Error("Invalid input."));
                    }}
                />
            </div>
            <button onClick={() => (onSwipeUp ? onSwipeUp(2, 3) : null)}>Swipe Up</button>
            <button onClick={() => (onSwipeDown ? onSwipeDown(2, 3) : null)}>Swipe Down</button>
            <button onClick={() => (onSwipeLeft ? onSwipeLeft(2, 3) : null)}>Swipe Left</button>
            <button onClick={() => (onSwipeRight ? onSwipeRight(2, 3) : null)}>Swipe Right</button>
        </div>
    );
}

export default App;
