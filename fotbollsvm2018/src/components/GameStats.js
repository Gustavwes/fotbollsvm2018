import React from 'react';
import { auth, db, firebase } from '../firebase';
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';
import uuid from 'uuid/v1';
import { Form, Field, reduxForm } from 'redux-form';
import { TextField } from '@material-ui/core';

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

        this.setState({ userId });

    }


    render() {
        const { games } = this.state;

        return (
            <div>
                {/* <p>{this.state.userId}</p> */}
                {!!games && <GamesListForm games={games} userid={this.state.userId} />}
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

class GamesListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.submitBet = this.submitBet.bind(this);
    }
    submitBet = (values) => {
        console.log(values);

        const firstKey = Object.keys(values)[0];
        const secondKey = Object.keys(values)[1];
        let teamAResult = 0;
        let teamBResult = 0;

        const userId = this.props.userid;
        const gameId = firstKey.split(':')[0];

        if(firstKey.split(':')[1] === 'teamA') {
            teamAResult = values[firstKey];
            teamBResult = values[secondKey];
        } else {
            teamBResult = values[firstKey];
            teamAResult = values[secondKey];
        }

        console.log(teamAResult, teamBResult, userId, gameId);

        db.doCreateBet(uuid(), teamAResult, teamBResult, userId, gameId);

    }
    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                 <Form onSubmit={handleSubmit(this.submitBet)}>
                {Object.keys(this.props.games).map(key =>
                    <div key={key}>
                       
                            <label>{this.props.games[key].teamA}</label>
                            {/* Create hidden input for game Id here */}
                            <Field
                                name={`${key}:teamA`}
                                component={({input, ...props}) => <TextField type="number" {...input} {...props}/>}
                                >
                            </Field>
                                <label>vs</label>
                            <Field
                                name={`${key}:teamB`}
                                component={({input, ...props}) => <TextField type="number" {...input} {...props}/>}
                            >
                            </Field>
                            <label>{this.props.games[key].teamB}</label>
                            <button type="submit">Submit</button>
                        
                    </div>
                )}
                </Form>
            </div>
        )
       
    }

}

GamesListForm = reduxForm({form: 'gamesListForms' })(GamesListForm);


const GameStatsPage = () => (
    <div>
        <h1>Game Stats</h1>
        <GameStats />
    </div>
);

export default GameStatsPage;
