import React from 'react';
import { auth, db, firebase } from '../firebase';
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';
import uuid from 'uuid/v1';
import {Field, reduxForm} from 'redux-form';

class GameStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gamesDB: db.doGetAllGames(),
            games: null,   
            userId: null         
           
        }
    }

    componentDidMount() {
        db.doGetAllGamesTest().then(snapshot =>
            this.setState(() => ({ games: snapshot.val() }))
        ); 
        var userId = firebase.auth.currentUser.uid;  
         
        this.setState({userId});

    }
    
    
    render() {
        const { games } = this.state;
        
        return (
            <div>
               {/* <p>{this.state.userId}</p> */}
                {!!games && <GamesList games={games} userid={this.state.userId} />}
            </div>
        );
    }
}
// const CurrentUserTest = () => (
//     <div>
//         <AuthUserContext.Consumer>
//         {authUser =>
//             <div>
//                 <h1>Account: {authUser.email}</h1>
               
//             </div>
//         }
//     </AuthUserContext.Consumer>
//     </div>
// )

const INITIAL_STATE = {
    teamAResult: '',
    teamBResult: '',
    userId: '',
    gameId: '',
    error: null,
};
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

<<<<<<< HEAD
        <h2>List of Games</h2>
        <p>(Saved in Firebase Database)</p>

        {/* {
            games.map(doc => {
                const key = doc.val();

                return (<div key={key}>
                    <form>
                        <p>{games[key].teamA}</p>
                        <input type="text" />
                        <p>vs</p>
                        <input type="text" />
                        <p>{games[key].teamB}</p>
                        <button>Submit</button>
    
                    </form>
                 </div>);
            })
        } */}
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
=======
class GamesList extends React.Component{
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }  
    onSubmit = (event) => {
        console.log('triggered');
        const {
            teamAResult,
            teamBResult,
            userId,
            gameId
        } = this.state;       
        this.userid = this.props.userid;
        // const {
            //     history,
            // } = this.props;

        db.doCreateBet(uuid(),teamAResult,teamBResult,userId,gameId);
        event.preventDefault();

    }
    render(){

        return(
            <div>
        
                <h2>List of Games</h2>
                <p>(Saved in Firebase Database)</p>
            
                {Object.keys(this.props.games).map(key =>
                    <div key={key}>
                        <form onSubmit={this.onSubmit}>
                            <p>{this.props.games[key].teamA}</p>
                            <input type="hidden" value={this.props.userid}></input>
                            {/* Create hidden input for game Id here */}
                            <input 
                                id={`${key}teamA`}
                                onChange={event => this.setState(byPropKey('teamAResult', event.target.value))}
                                type="text"
                                value={this.state.teamAResult}
                            >
                            </input>
                            <p>vs</p>
                            <input id={`${key}teamB`}
                                onChange={event => this.setState(byPropKey('teamBResult', event.target.value))}
                                type="text"
                                value={this.state.teamBResult}
                            >
                            </input>
                            <p>{this.props.games[key].teamB}</p>
                            <button type="submit">Submit</button>
        
                        </form>
                    </div>
                )}
            </div>
        )
    }

}
>>>>>>> be87fab7af487b89b2337be497140fb08140cf9a

const GameStatsPage = () => (
    <div>
        <h1>Game Stats</h1>
        <GameStats />
    </div>
);

export default GameStatsPage;
