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
                <input type="number" name="input-row" id="input-row" placeholder="Row" />
                <input type="number" name="input-column" id="input-column" placeholder="Column" />
            </div>
            <button onClick={() => (onSwipeUp ? onSwipeUp(2, 3) : null)}>Swipe Up</button>
            <button onClick={() => (onSwipeDown ? onSwipeDown(2, 3) : null)}>Swipe Down</button>
            <button onClick={() => (onSwipeLeft ? onSwipeLeft(2, 3) : null)}>Swipe Left</button>
            <button onClick={() => (onSwipeRight ? onSwipeRight(2, 3) : null)}>Swipe Right</button>
        </div>
    );
}

export default App;
