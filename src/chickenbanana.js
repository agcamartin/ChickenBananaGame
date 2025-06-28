import React, { useState } from 'react';
import './chickenbanana.css';

const GRID_SIZE = 6;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

const chickenImg = 'https://thumbs.dreamstime.com/b/little-baby-chicken-cartoon-illustration-white-background-cute-chick-children-book-kids-colorful-illustrations-bird-310200753.jpg?w=768';
const bananaImg = 'https://thumbs.dreamstime.com/b/banana-14715288.jpg?w=768';

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
      <img 
      src="https://globalfajar.com/wp-content/uploads/2023/09/Banana-Chicken-A-Fusion-of-Taste-and-Health-Benefits-You-Dont-Want-to-Miss-jpg.webp" 
      alt="Choose your side" 
      style={{ width: '150px', marginBottom: '10px' }} 
    />  
      {!choice && (
        <div className="choice-container">
          <button className="choice-button" onClick={() => startGame('banana')}>Player Banana</button>
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
        <div className="result-container">
            <h2 className="lose">YOU LOST THE ROUND!</h2>
            <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS-Q0k8LGeyPdlPDhZPdhR1yvoT9scpz2qcA&s" 
            alt="Game over animation"
            style={{ width: '200px', margin: '20px 0' }}
            />
            <p></p>
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
        )}


          {win && (
            <div className="result-container">
              <h2 className="win">YOU WON THE ROUND!</h2>
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
