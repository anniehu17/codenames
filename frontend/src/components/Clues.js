import React, {Component} from "react";
import axios from "axios";

class Clues extends Component {
    constructor(props) {
        super(props);

        this.state = {
            points: 0,
            html: <div></div>
        }

        props.cluesCallback(this);
    }

    fetchUserPoints(username) {
        axios.get("api/points", {headers: {"username": username}})
            .then((res) => this.setState({points: res.data["points"]}, this.updateHtmlNoFetch))
            .catch((err) => {
                console.log(err);
                this.setState({points: 0});
            })
    }

    addUserPoints(username, points) {
        axios.post("api/points/add", {}, {headers: {"username": username, "points": points}})
            .then((res) => "")
            .catch((err) => console.log(err));
    }

    updateHtmlNoFetch() {
        this.updateHtml(null, true);
    }

    renderUserInfo(loginInfo, skipFetch) {
        loginInfo = loginInfo ? loginInfo : this.props.loginInfo;
        if (loginInfo === {} || loginInfo["loginState"] !== "SUCCESS") {
            return <h3>Login to add your score to the leaderboard!</h3>
        }

        let acquiredPoints = this.props.place >= 0 ? 100 - this.props.place : 0;
        if (!skipFetch) {
            this.fetchUserPoints(loginInfo["username"]);

            if (this.state.points === -1) {
                setTimeout(() => "", 1000)
            }



            this.addUserPoints(loginInfo["username"], acquiredPoints);
        }

        return (
            <div className="scoreCentered">
                <h3 className="gainedPoints">Gained: {acquiredPoints} points</h3>
                <h3 className="totalPoints">Total: {this.state.points} points</h3>
            </div>

        )

    }

    updateHtml(loginInfo, skipFetch) {
        this.setState({html:
            <div className="resultText">
                <p>
                    <h3>
                        Your guess <b className="yourGuess">{this.props.guess}</b> was { this.props.place > -1 ? `the #${ this.props.place + 1 } clue.` : "not in the top 100 clues." }
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
                {this.renderUserInfo(loginInfo, skipFetch)}
            </div>
        })
    }

    render() {
        if (this.props.guess === "") { return <div></div>}
        return this.state.html;
    }
}

export default Clues;