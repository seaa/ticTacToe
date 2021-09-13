import React, { useState } from 'react';

import { GameLayout } from '../../components/GameLayout';

// since thre is only 8 winning combinations, we can
// calculate this hardcoding every position
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

  // calculateWinner returns the value of the winner player if exists (X or O)
  // we return null if there is no winner to rendeer an empty message on GameLayout
  return null;
}

/*
* Main container: here we have all the logic that controls the game,
* including our main state.
* Note that we don't include any interface-related jsx oon containers
*/
const Game = () => {

  // our application state.
  // for small apps, this can be on a top-level container,
  // but it's noot adviced for real apps, we should be using an external
  // state handling library
  const [history, setHistory] = useState(
    [
      { squares: Array(9).fill(null) }
    ]
  );
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);

  // clicking on a square should update the state and check for a winner
  // we make copies of the state, in order to avoid mutations
  const handleClick = (i) => {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[historySlice.length - 1];
    const squares = current.squares.slice();

    // early exit because there is a winner!
    // we dont want to add any more steps to the history
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

  // moving through the history state just replaces the current step number.
  // we dont delete the rest, since we want to be able to go Back to the Future ™
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
