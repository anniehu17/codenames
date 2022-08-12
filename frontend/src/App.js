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
            board: []
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
                <div className="loginContainer">
                    <Form onSubmit={handleLogin}/>
                </div>
                <div>
                    <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'/>
                    { _board["board"] ? (this.renderBoard()) : (<div></div>) }
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

export default App;