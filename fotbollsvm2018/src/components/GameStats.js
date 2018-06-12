import React from 'react';
import { db } from '../firebase';
import * as routes from '../constants/routes';

class GameStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gamesDB: db.doGetAllGames(),
            games: null,
        };
    }

    componentDidMount() {
        db.doGetAllGamesTest().then(snapshot =>
            this.setState(() => ({ games: snapshot.val() })));
        // var test = db.doGetAllGamesTest();
        //     this.setState(() => ({ games: test }));
        //     console.log(test);
    }

    render() {
        const { games } = this.state;
        return (
            <div>
                { !!games && <GamesList games={games} /> }
            </div>
        );
    }
}

const GamesList = ({ games }) => (
    <div>

        <h2>List of Games</h2>
        <p>(Saved in Firebase Database)</p>

        {Object.keys(games).map(key =>
            (<div key={key}>
                <form>
                    <p>{games[key].teamA}</p>
                    <input type="text" />
                    <p>vs</p>
                    <input type="text" />
                    <p>{games[key].teamB}</p>
                    <button>Submit</button>

                </form>
             </div>))}
    </div>
);


const GameStatsPage = () => (
    <div>
        <h1>Game Stats</h1>
        <GameStats />
    </div>
);

export default GameStatsPage;
