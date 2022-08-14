import {Component} from "react";

const Leaderboard = ({entries}) => {
    const displayList = [];

    if (entries != null) {
        for (let i = 0; i < 20 && i < entries.length; i++) {
            displayList.push(<LeaderboardEntry rank={i + 1} username={entries[i]["username"]} score={entries[i]["points"]}/>);
        }
    }

    return (
        <div className="leaderboardContainer">{displayList}</div>
    );


}

const LeaderboardEntry = ({rank, username, score}) => {
    return (
        <div className="leaderboardEntry">
            <div className="leaderboardRank">
                <p>{rank}</p>
            </div>
            <div className="leaderboardName">
                <p>{username}</p>
            </div>
            <div className="leaderboardScore">
                <p>{score}</p>
            </div>
        </div>
    )
}

export default Leaderboard;
