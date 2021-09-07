import React, { useState } from 'react';

import { GameLayout } from '../../components/GameLayout';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Game = () => {

  const [history, setHistory] = useState(
    [
      { squares: Array(9).fill(null) }
    ]
  );

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);

  const handleClick = (i) => {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[historySlice.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setHistory(historySlice.concat([
      { squares: squares }
    ]));
    setStepNumber(historySlice.length);
    setxIsNext(!xIsNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setxIsNext((step % 2) === 0);
  }

  return (
    <GameLayout
      history={history}
      xIsNext={xIsNext}
      currentStep={history[stepNumber]}
      winner={calculateWinner(history[stepNumber].squares)}
      handleClick={handleClick}
      moveInHistory={jumpTo}
    />
  )
}

export default Game;
