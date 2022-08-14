import React, {Component} from "react";

class Clues extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.guess === "") { return <div></div>}
        return (
          <div>
            <p>
                <h3>
                    Your guess {this.props.guess} was { this.props.place > -1 ? `the #${ this.props.place } clue.` : "not in the top 100 clues." }
                </h3>
                <h3>
                    The Top 5 Clues Were:
                </h3>
                <ol>
                    <li>{this.props.clues[0]}</li>
                    <li>{this.props.clues[1]}</li>
                    <li>{this.props.clues[2]}</li>
                    <li>{this.props.clues[3]}</li>
                    <li>{this.props.clues[4]}</li>
                </ol>
            </p>
          <h3>Login to add your score to the leaderboard!</h3>
        </div>
      )
    }
}

export default Clues;