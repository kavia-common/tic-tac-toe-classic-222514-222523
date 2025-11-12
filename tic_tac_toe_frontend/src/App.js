import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * A minimal, accessible Tic Tac Toe game implemented with React.
 * - 3x3 board
 * - Alternating turns (X then O)
 * - Winner and draw detection
 * - Disables moves after game end
 * - Status announced via aria-live
 * - Restart button to reset game
 * - Centered, responsive layout with light theme accents
 */

/** Utility: calculate the winner of the board */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

/**
 // PUBLIC_INTERFACE
 * Square: A single board cell button.
 * @param {{value: 'X'|'O'|null, onClick: Function, disabled: boolean, isWinning: boolean, index: number}} props
 * Accessible with role="button" via native button, includes aria-pressed state mapping.
 */
function Square({ value, onClick, disabled, isWinning, index }) {
  const label = value ? `Cell ${index + 1}, ${value}` : `Cell ${index + 1}, empty`;
  return (
    <button
      className={`ttt-square ${value ? `ttt-square-${value.toLowerCase()}` : ''} ${isWinning ? 'ttt-square-win' : ''}`}
      onClick={onClick}
      disabled={disabled || Boolean(value)}
      aria-label={label}
      aria-disabled={disabled || Boolean(value)}
    >
      {value}
    </button>
  );
}

/**
 // PUBLIC_INTERFACE
 * Board: Renders 3x3 grid of Square components.
 * @param {{squares: (('X'|'O'|null)[]), onSquareClick: Function, winningLine: number[], isBoardLocked: boolean}} props
 */
function Board({ squares, onSquareClick, winningLine, isBoardLocked }) {
  return (
    <div className="ttt-grid" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((val, idx) => (
        <div role="row" key={`row-${Math.floor(idx / 3)}`} className={`ttt-row ${idx % 3 === 0 ? 'row-start' : ''}`}>
          {/* empty - rows are visual only; buttons within are interactive */}
        </div>
      ))}
      {squares.map((val, idx) => {
        const isWinning = winningLine.includes(idx);
        const handleClick = () => onSquareClick(idx);
        return (
          <Square
            key={idx}
            value={val}
            onClick={handleClick}
            disabled={isBoardLocked}
            isWinning={isWinning}
            index={idx}
          />
        );
      })}
    </div>
  );
}

/**
 // PUBLIC_INTERFACE
 * App: Main game component – handles state and layout.
 * No external APIs or env vars are required for functionality.
 */
function App() {
  // Game state
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Theme state: keep existing capability but default to light
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const { winner, line: winningLine } = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = useMemo(() => !winner && squares.every(Boolean), [winner, squares]);
  const isBoardLocked = Boolean(winner) || isDraw;

  const currentPlayer = xIsNext ? 'X' : 'O';

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    if (squares[index] || isBoardLocked) return; // ignore if filled or game over
    setSquares((prev) => {
      const next = prev.slice();
      next[index] = currentPlayer;
      return next;
    });
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const statusText = winner
    ? `Winner: ${winner}!`
    : isDraw
    ? 'Draw game.'
    : `Next player: ${currentPlayer}`;

  return (
    <div className="App">
      <main className="ttt-container">
        <header className="ttt-header">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>

        <section className="ttt-status-wrapper" aria-live="polite" aria-atomic="true">
          <p className={`ttt-status ${winner ? 'ttt-status-win' : isDraw ? 'ttt-status-draw' : ''}`}>
            {statusText}
          </p>
        </section>

        <section className="ttt-board-wrapper">
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            winningLine={winningLine}
            isBoardLocked={isBoardLocked}
          />
        </section>

        <section className="ttt-actions">
          <button className="ttt-restart-btn" onClick={handleRestart} aria-label="Restart game">
            Restart
          </button>
        </section>

        <footer className="ttt-footer">
          <small className="ttt-hint">Two players on one device. X goes first.</small>
        </footer>
      </main>
    </div>
  );
}

export default App;
