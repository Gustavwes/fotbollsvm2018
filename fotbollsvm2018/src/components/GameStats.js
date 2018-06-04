import React from 'react';
import { db } from '../firebase';
import * as routes from '../constants/routes';

class GameStats extends React.Component {
    constructor(props){
        super(props);
        //this.getGamesList = this.getGamesList.bind(this);
        //this.getGamesListTest = this.getGamesListTest.bind(this);
        this.state = {
            gamesDB: db.doGetAllGames(),  
            games: null
        }
              
    }

    componentDidMount() {
         //this.getGamesList();
        // let that = this;
        // that.setState({
        //     games: [...this.state.games,this.getGamesList()]
        // })
        db.doGetAllGamesTest().then(snapshot =>
            this.setState(() => ({ games: snapshot.val() }))
        );
        console.log(this.state.games);
    }

    // getGamesList() {
    //     let that = this;
    //     //let gameArray = [];
    //     this.state.gamesDB.on('value', function(snapshot){
    //      snapshot.forEach(function(game) {
    //          console.log(game.val());
    //          let gameObject = game.val(); 
    //       //   gameArray.push(gameObject);                    
    //          that.setState({
    //              games: [...that.state.games, gameObject]
    //          }); 
    //      })
    //       console.log(that.state.games.length);
    //     //console.log(gameArray.length);
    //    // return gameArray;
         
    //  })

    // }
    
    render(){        
        const { games } = this.state;
        return (
            <div>
                <p>WHY</p>
                { !!games && <GamesList games ={games} /> }
            </div>
        )
    }
}

const GamesList = ({ games }) =>
<div>
    <h2>List of Games</h2>
    <p>(Saved in Firebase Database)</p>

    {Object.keys(games).map(key =>
        <div key={key}>Matchday:{games[key].matchday}{games[key].teamA} vs {games[key].teamB}</div>
    )}
</div>

const GameStatsPage = () =>
    <div>
        <h1>Game Stats</h1>
        <GameStats />
    </div>

export default GameStatsPage;