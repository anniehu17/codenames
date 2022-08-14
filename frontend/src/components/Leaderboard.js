import {Component} from "react";

const Leaderboard = ({entries}) => {
    const displayList = [];

    if (entries != null) {
        for (let i = 0; i < 20 && i < entries.length; i++) {
            displayList.push(<LeaderboardEntry rank={i + 1} username={entries[i]["username"]} score={entries[i]["points"]}/>);
        }
    }

    return (
        <div className="leaderboardContainer">
            <div className="leaderboardHeader">
                <h2>Leaderboard</h2>
            </div>
            <table>
                <div>
                    <th className="leaderboardRank">Rank</th>
                    <th className="leaderboardName">Username</th>
                    <th className="leaderboardScore">Score</th>
                </div>
                {displayList}
            </table>
        </div>
    );


}

const LeaderboardEntry = ({rank, username, score}) => {
    return (
        <div className="leaderboardEntry">
            <tr>
                <td className="leaderboardRank">
                    <p>{rank}</p>
                </td>
                <td className="leaderboardName">
                    <p>{username}</p>
                </td>
                <td className="leaderboardScore">
                    <p>{score}</p>
                </td>
            </tr>
        </div>
    )
}

export default Leaderboard;
