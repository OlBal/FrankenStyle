import React, { Component } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Fade from "react-reveal/Fade";
import "../../App.css";

class StartForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1Name: "",
      player2Name: "",
      player3Name: "",
      player4Name: "",
      show: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ show: !this.state.show });
  }

  handleChange(e, input) {
    let change = {};
    change[input] = e.currentTarget.value;
    this.setState(change);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { player1Name, player2Name, player3Name, player4Name } = this.state;

    if (
      player1Name !== "" &&
      player2Name !== "" &&
      player3Name !== "" &&
      player4Name !== ""
    ) {
      this.props.handleSave(player1Name, player2Name, player3Name, player4Name);
    }
  }

  render() {
    const { player1Name, player2Name, player3Name, player4Name } = this.state;

    return (
      <>
        <div className="container-global">
          <div className="container-form-start">
            <h1 className="start-title">FrankenStyle</h1>

            <div className="startform">
              <form onSubmit={this.handleSubmit} className="form form-grid">
                <div className="row1">
                  <Input
                    label="Player 1"
                    name="player1Name"
                    type="text"
                    value={player1Name}
                    handleChange={(e) => this.handleChange(e, "player1Name")}
                    required
                  />
                </div>
                <div className="row2">
                  <Input
                    label="Player 2"
                    name="player2Name"
                    type="text"
                    value={player2Name}
                    handleChange={(e) => this.handleChange(e, "player2Name")}
                    required
                  />
                </div>
                <div className="row3">
                  <Input
                    label="Player 3"
                    name="player3Name"
                    type="text"
                    value={player3Name}
                    handleChange={(e) => this.handleChange(e, "player3Name")}
                    required
                  />
                </div>
                <div className="row4">
                  <Input
                    label="Player 4"
                    name="player4Name"
                    type="text"
                    value={player4Name}
                    handleChange={(e) => this.handleChange(e, "player4Name")}
                    required
                  />
                </div>
                <Button
                  buttonClass=" pulse buttons-startgame button-startform"
                  label="Start"
                />
              </form>

              <Button
                buttonClass="pulse buttons-startgame rules"
                handleClick={this.handleClick}
                label="Rules"
              />

              <div className="text-container">
                <Fade bottom cascade collapse when={this.state.show}>
                  <article className="rules-text-col1">
                    <h2 className="rules-header">Rules</h2>
                    <p>
                      <span>
                        Player 1 is given a word, that they try to draw.
                      </span>
                      <span>
                        Player 2 then guesses what the drawing represents.
                      </span>
                    </p>
                  </article>
                </Fade>
              </div>

              <div className="text-container">
                <Fade bottom cascade collapse when={this.state.show}>
                  <article className="rules-text-col2">
                    <p>
                      <span>
                        Player 3 tries to draw previous player's guess.
                      </span>
                      <span>
                        Player 4 has to guess what previous player's drawing
                        represents.
                      </span>
                    </p>
                  </article>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StartForm;
