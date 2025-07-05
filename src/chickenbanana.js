import React, { useState } from 'react';
import './chickenbanana.css';

const GRID_SIZE = 6;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

const chickenImg = 'https://static.vecteezy.com/system/resources/previews/034/723/075/non_2x/ai-generated-hen-chicken-poultry-animal-free-png.png';
const bananaImg = 'https://static.vecteezy.com/system/resources/previews/051/691/089/non_2x/adorable-banana-cartoon-character-on-transparent-background-free-png.png';

function generateBoard() {
  const board = [];
  for (let i = 0; i < TOTAL_TILES; i++) {
    board.push(Math.random() < 0.5 ? 'banana' : 'chicken');
  }
  return board;
}

function Game() {
  const [board, setBoard] = useState([]);
  const [choice, setChoice] = useState(null);
  const [clicked, setClicked] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const startGame = (playerChoice) => {
    setChoice(playerChoice);
    setBoard(generateBoard());
    setClicked(new Set());
    setGameOver(false);
    setWin(false);
  };

  const handleClick = (index) => {
    if (gameOver || win || !choice) return;
    if (clicked.has(index)) return;

    const tileType = board[index];

    if (tileType !== choice) {
      setClicked(new Set([...clicked, index]));
      setGameOver(true);
      return;
    }

    const newClicked = new Set(clicked);
    newClicked.add(index);
    setClicked(newClicked);

    const totalChoiceTiles = board.filter((t) => t === choice).length;
    if (newClicked.size === totalChoiceTiles) {
      setWin(true);
    }
  };

  return (
    <div className="container">
      <h1>Chicken Banana Game</h1>
      {!choice && (
        <div className="choice-container">
          <p>Choose your Fighter!</p>
          <button className="choice-button" onClick={() => startGame('banana')}>Player Banana          </button>
          <button className="choice-button" onClick={() => startGame('chicken')}>Player Chicken</button>
        </div>
      )}

      {choice && (
        <>
          <p> You are the <strong>{choice.toUpperCase()}</strong></p>
          <div className="grid">
            {board.map((_, idx) => {
              const isClicked = clicked.has(idx);
              const tileType = board[idx];
              return (
                <div
                  key={idx}
                  className={`tile ${isClicked ? 'clicked' : ''} ${gameOver || win ? 'disabled' : ''}`}
                  onClick={() => handleClick(idx)}
                >
                  {isClicked ? (
                    <img
                      src={tileType === 'banana' ? bananaImg : chickenImg}
                      alt={tileType}
                    />
                  ) : (
                    <span className="?">?</span>
                  )}
                </div>
              );
            })}
          </div>

        {gameOver && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="lose">YOU LOST THIS ROUND!</h2>
              <img
                src="https://media1.tenor.com/m/1cd4rNbBLagAAAAC/diaryofawimpykid-loser.gif"
                alt="Game over animation"
                style={{ width: '200px', margin: '20px 0' }}
              />
              <p>  </p>
              <button
                className="restart-button"
                onClick={() => {
                  setChoice(null);
                  setGameOver(false);
                  setClicked(new Set());
                  setBoard([]);
                  setWin(false);
                }}
              >
                Restart
              </button>
            </div>
          </div>
        )}
          {win && (
            <div className="result-container">
              <h2 className="win">YOU WON THE ROUND!</h2>
              <></>
              <button
                className="restart-button"
                onClick={() => {
                  setChoice(null);
                  setClicked(new Set());
                  setBoard([]);
                  setGameOver(false);
                  setWin(false);
                }}
              >
                Play Again (Choose Side)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Game;
