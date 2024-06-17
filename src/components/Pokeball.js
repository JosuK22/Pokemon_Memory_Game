import React from "react";
import Background from '../assets/Images/Pokemon/pokeball.png';
import './pokeball.css';

const PokeBall = ({ card, handleChoices, flipped, disabled, vibrating }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoices(card);
    }
  };

  return (
    <div
      className={`card ${flipped ? "flipped" : ""} ${
        vibrating ? "vibrate" : ""
      }`}
      onClick={handleClick}>
      <div className="inner">
        <img src={card.src} className="front" alt="card front" id="pokemon"/>
        <img
          src={Background}
          id="pokeball"
          className="back"
          alt="card back"
        />
      </div>
    </div>
  );
};

export default PokeBall;
