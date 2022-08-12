import React, {Component, useState} from "react";
import './App.css'
import Form from "./components/Form";
import axios from "axios";

const handleLogin = () => {
    //
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            seen: false
        }
    }

    renderSquare(board, index) {
        return (<Square board={board} index={index}/>);
    }

    componentDidMount() {
        this.fetchBoard().then(() => {
            console.log("Fetched board");
        });
    }

    async fetchBoard() {
        axios.get("api/test")
            .then(res => this.setState({board: res.data}))
            .catch((err) => console.log(err))
    }

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    renderBoard() {
        const _board = this.state.board["board"];
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(_board[0], 0)}
                    {this.renderSquare(_board[0], 1)}
                    {this.renderSquare(_board[0], 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(_board[1], 0)}
                    {this.renderSquare(_board[1], 1)}
                    {this.renderSquare(_board[1], 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(_board[2], 0)}
                    {this.renderSquare(_board[2], 1)}
                    {this.renderSquare(_board[2], 2)}
                </div>
            </div>
        )
    }

    render() {
        const _board = this.state.board;
        return (
            <div>
                <div>
                    {/*<div>*/}
                        {this.state.seen ? null : <PopUp toggle={this.togglePop} />}
                    {/*</div>*/}
                </div>
                <div className="pageCenter">
                    <div>
                        <GuessForm></GuessForm>
                        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'/>
                        { _board["board"] ? (this.renderBoard()) : (<div></div>) }
                    </div>
                </div>
            </div>
        )
    }

}


class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
        board: null,
        index: 0,
    }
  }

  render() {
      const square = this.props.board[this.props.index];
    return (
        <button className="square" color={square["color"]} onClick={() => console.log('click')}>
            <div className="squareText">{ square["word"] }</div>
        </button>
    )
  }
}

class GuessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        clues: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('A guess was submitted: ' + this.state.value);
      event.preventDefault();
      let inTop = false;
      let place = -1;
      inTop = this.state.clues.includes(this.state.value);
      if (inTop) {
          place = this.state.clues.indexOf(this.state.value)
      }
      return (
            <div>
                <p>
                    <h3>
                        Your guess {this.state.value} was { inTop ? "the " + {place} + " clue." : "not in the top 100 clues." }
                    </h3>
                    <h3>
                        The Top 5 Clues Were:
                    </h3>
                    <ol>
                        <li>{clues[0]}</li>
                        <li>{clues[1]}</li>
                        <li>{clues[2]}</li>
                        <li>{clues[3]}</li>
                        <li>{clues[4]}</li>
                    </ol>
                </p>
            </div>
        )
  }

  async fetchClues() {
        axios.get("api/clues")
            .then(res => this.setState({clues: res.data}))
            .catch((err) => console.log(err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input className="GuessText" type="text" placeholder="enter your guess: " value={this.state.value} onChange={this.handleChange} />
        </label>
        <input className="GuessButton" type="submit" value="guess" />
      </form>
    );
  }
}

class PopUp extends Component {
    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div className="popup">
                <div className="popup-content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <p>
                        <h3>How to Play Clue Guesser!</h3>
                        Clue Guesser is a game based on Codenames.
                        <br></br>
                        <br></br>
                        The goal is to come up with clues that are better than our AI!
                        <br></br>
                        <br></br>
                        The 3x3 board has blue, red, and black tiles on it.
                        In Codenames, the blue tiles are the player's team's words and the red tiles are the opposite team's words.
                        The black tile represents a bomb which, if chosen, will end the game in favor of the team of the team who didn't choose it.
                        <br></br>
                        <br></br>
                        The player must come up with a clue that will hint towards the blue words while avoiding the red and black words.
                        <br></br>
                        <br></br>
                        Better clues will avoid the black word - the bomb - at all costs since the penalty is losing the game.
                        <br></br>
                        <br></br>
                        Our AI algorithm will come up with the top 100 clues based on James Somers' algorithm.
                        <br></br>
                        <br></br>
                        The player's clue will be compared to the top 100 clues and earn points based on its placing on the top 100 clues.
                        <br></br>
                        <br></br>
                        Players can save their points by signing in and compare their points ranking with other players on the leaderboard.
                        <br></br>
                        <br></br>
                        Can you beat our AI?
                        <btn className="close" onClick={this.handleClick}>CLOSE &times;</btn>
                    </p>
                </div>
            </div>
        );
    }
}

export default App;

// Codenames is a Czech board game by Vlaada Chvátil where the goal is to say a one-word clue to your teammates in order to get them to choose correctly from the words laid out on the table.
// The real game is played on a 5x5 board, but we'll use a 3x3 board abstraction.
// The three blue words are the target words—that's what you want your teammates to guess. The black word is the bomb; if your teammates say that one, they instantly lose the game. The red words are neutral or perhaps belong to your opponent.
// Your task is to come up with a single word that connects the blue words while avoiding the others.