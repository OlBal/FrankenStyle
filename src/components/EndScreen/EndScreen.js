import React from "react";
import Button from "../Button/Button";

const EndScreen = ({ word, image, roundInputs, handleReset, players }) => {
  return (
    <>
      <div className="container-global">
        <div className="container-endscreen">
          <div className="shadow">
            <div className="container-card-grid-endscreen card-grid-endscreen-original">
              <p className="card-word card-lower-elements endscreen-card-text">
                Original
              </p>
              <img
                className="img-card img-card-round-background img-card-endscreen"
                alt={word}
                src={image}
              />
              <div className="card-lower">
                <p className="card-word card-lower-elements">{word}</p>
              </div>
            </div>
          </div>
          <div className="shadow">
            <div className="container-card-grid-endscreen card-grid-endscreen-sketch1">
              <p className="card-word card-lower-elements endscreen-card-text">
                {players[0]}
              </p>
              <img
                className="img-card img-card-round-background img-card-endscreen"
                alt="player-1-drawing"
                src={roundInputs[0]}
              />
              <div className="card-lower">
                <p className="card-word card-lower-elements endscreen-card-text">
                  <span>{players[1]} </span>
                  <span span className="word">
                    {roundInputs[1]}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="shadow">
            <div className="container-card-grid-endscreen card-grid-endscreen-sketch2">
              <p className="card-word card-lower-elements endscreen-card-text">
                {players[2]}
              </p>
              <img
                className="img-card img-card-round-background img-card-endscreen"
                alt="player-2-drawing"
                src={roundInputs[2]}
              />
              <div className="card-lower">
                <p className="card-word card-lower-elements endscreen-card-text">
                  <span>{players[3]} </span>
                  <span className="word">{roundInputs[3]}</span>
                </p>
              </div>
            </div>
          </div>

          <Button
            label="New Game"
            buttonClass="pulse button button-newgame"
            handleClick={handleReset}
          />
        </div>
      </div>
    </>
  );
};

export default EndScreen;
