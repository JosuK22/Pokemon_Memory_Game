import React, { useEffect, useState } from "react";

import PokeBall from "./components/Pokeball";

import Pokemon_1 from './assets/Images/Pokemon/pikachu.png';
import Pokemon_2 from './assets/Images/Pokemon/balbasaur.png';
import Pokemon_3 from './assets/Images/Pokemon/charmander.png';
import Pokemon_4 from './assets/Images/Pokemon/eevee.png';
import Pokemon_5 from './assets/Images/Pokemon/gengar.png';
import Pokemon_6 from './assets/Images/Pokemon/ss.png';
import './App.css';

const cardImages = [
  { src: Pokemon_1, matched: false },
  { src: Pokemon_2, matched: false },
  { src: Pokemon_3, matched: false },
  { src: Pokemon_4, matched: false },
  { src: Pokemon_5, matched: false },
  { src: Pokemon_6, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index + 1 }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoices = (card) => {
    if (disabled) return; 

    if (card === choiceOne || card === choiceTwo) {
      return; 
    }

    if (choiceOne && choiceTwo) {
      return; 
    }

    if (choiceOne) {
      setChoiceTwo(card);
      setTurns(turns + 1);
    } else {
      setChoiceOne(card);
    }
  };

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src || card.src === choiceTwo.src
              ? { ...card, matched: true }
              : card
          )
        );
        resetTurns();
      } else {
        setTimeout(resetTurns, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="main">
      <h1>POKEMON GAME</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <PokeBall
            key={card.id}
            card={card}
            handleChoices={handleChoices}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
