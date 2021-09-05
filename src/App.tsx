import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGameLogic } from "./context/2048";

function App() {
    const { gameState, onSwipeRight } = useGameLogic();

    console.log(gameState);
    return <div className="App">{gameState} <button onClick={() => onSwipeRight ? onSwipeRight(2,3) : null}>Swipe</button></div>;
}

export default App;
