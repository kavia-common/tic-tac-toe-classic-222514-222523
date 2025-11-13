import React, { useMemo, useState } from 'react';

type Player = 'X' | 'O' | null;

const WIN_LINES = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function calculateWinner(cells: Player[]): Player {
  for (const [a,b,c] of WIN_LINES) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function App(): JSX.Element {
  /**
   * Main App component implementing Tic Tac Toe:
   * - 3x3 grid board
   * - Alternating player turns (X starts)
   * - Winner detection and draw detection
   * - Restart game button
   * Additionally shows selected environment variables to validate .env handling.
   */
  const [cells, setCells] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const winner = useMemo(() => calculateWinner(cells), [cells]);
  const isDraw = useMemo(() => cells.every(Boolean) && !winner, [cells, winner]);

  const status = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return 'Draw!';
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  }, [winner, isDraw, xIsNext]);

  const onClickCell = (index: number) => {
    if (winner || cells[index]) return;
    const next = cells.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setCells(next);
    setXIsNext(!xIsNext);
  };

  const restart = () => {
    setCells(Array(9).fill(null));
    setXIsNext(true);
  };

  // Read some env values to ensure Vite exposes REACT_APP_* correctly
  const apiBase = import.meta.env.REACT_APP_API_BASE as string | undefined;
  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL as string | undefined;
  const nodeEnv = import.meta.env.REACT_APP_NODE_ENV as string | undefined;

  return (
    <div className="app">
      <div className="card" role="region" aria-label="Tic Tac Toe">
        <div className="status" aria-live="polite">{status}</div>
        <div className="board">
          {cells.map((value, idx) => (
            <button
              key={idx}
              className="cell"
              aria-label={`cell ${idx + 1}`}
              onClick={() => onClickCell(idx)}
              disabled={Boolean(value) || Boolean(winner)}
            >
              {value ?? ''}
            </button>
          ))}
        </div>
        <div className="actions">
          <button className="button" onClick={restart}>Restart</button>
        </div>
        <div className="meta">
          <div>ENV: {nodeEnv ?? 'N/A'}</div>
          <div>API_BASE: {apiBase ?? 'N/A'}</div>
          <div>BACKEND_URL: {backendUrl ?? 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}
