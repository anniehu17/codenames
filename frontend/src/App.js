import React, {Component, useState} from "react";
import './App.css'
import Form from "./components/Form";
import Login from "./components/Login"
import axios from "axios";
import Cookies from 'universal-cookie';
import Clues from "./components/Clues";
import GuessForm2 from "./components/GuessForm2";
import Leaderboard from "./components/Leaderboard";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            game: [],
            seen: false,
            loginClicked: false,
            guess: "",
        }

    }

    componentDidMount() {
        this.fetchBoard().then(() => {
            console.log("Fetched board");
        });
    }

    async fetchBoard() {
        if (!this.state.loaded) {
            this.setState({loaded: true})
            axios.get("api/test")
                .then(res => this.setState({game: res.data}))
                .catch((err) => console.log(err))
        }
    }

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    onGuessSubmit = (guess) => {
        this.setState({guess: guess});
    }

    renderSquare(board, index) {
        return (<Square board={board} index={index}/>);
    }

    renderBoard() {
        const _board = this.state.game["board"];
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

    renderGuessResult() {
        const game = this.state.game;
        return (
            <div className="result">
                <Clues clues={ game["clues"] ? game["clues"] : [] } guess={this.state.guess} place={game["clues"] ? game["clues"].indexOf(this.state.guess) : -1}/>;

            </div>
        )
    }

    render() {
        const game = this.state.game;
        return (
            <div>
                <Leaderboard entries={game["leaderboard"]}/>
                <Login/>
                {this.state.seen ? null : <PopUp toggle={this.togglePop} />}
                <div className="pageCenter">
                    <div>
                        <GuessForm2 onSubmit={this.onGuessSubmit} />
                        { this.renderGuessResult() }
                        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'/>
                        { game["board"] ? (this.renderBoard()) : (<div></div>) }
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

class PopUp extends Component {
    handleClick = () => {
        this.props.toggle();
        const cookies = new Cookies();
        cookies.set("read-popup", "true", { path: '/' })
    };

    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get('read-popup')) {
            this.props.toggle();
        }
    }

    render() {
        return (
            <div className="popup">
                <div className="popup-content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <p>
                        <h3>How to Play Clue Guesser!</h3>
                        Clue Guesser is a game based on Codenames where the goal is to say a one-word clue to your teammates in order to get them to choose correctly from the words laid out on the board.
                        <br></br>
                        <br></br>
                        The real game has a 5x5 board but we'll use a 3x3 board abstraction with blue, red, and black words.
                        <br></br>
                        <br></br>
                        The blue words are the target words you want your teammates to guess. The black word is the bomb. If your teammates choose the bomb, they instantly lose the game.
                        The red words are neutral or represent the opposing team's words.
                        <br></br>
                        <br></br>
                        Your Task: Come up with a clue that connects the blue words while avoiding the others.
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