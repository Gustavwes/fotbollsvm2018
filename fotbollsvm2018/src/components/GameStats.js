import React from 'react';
import { auth, db, firebase } from '../firebase';
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';
import uuid from 'uuid/v1';
import { Form, Field, reduxForm } from 'redux-form';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import { getBets } from '../state/actions/bets';

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
                {!!games && <GamesListForm games={games} userid={this.state.userId} {...this.props} />}
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
        const userId = this.props.userid;       

        db.doCreateBet(userId, values);

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
                                name={`${key}.teamAResult`}
                                component={({input, ...props}) => <TextField type="number" {...input} {...props}/>}
                                >
                            </Field>
                                <label>vs</label>
                            <Field
                                name={`${key}.teamBResult`}
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


class GameStatsPage extends React.Component {
    componentWillMount() {
        this.props.getBets().then(() => console.log(this.props.initialValues));
    }

    render() { return (
        <div>
            <h1>Game Stats</h1>
            <GameStats {...this.props} />
        </div>
    )}
};

GameStatsPage = reduxForm({form: 'gamesListForm', enableReinitialize: true })(GameStatsPage);

const mapStateToProps = state => ({
    initialValues: state.bets.bets,
});

const mapDispatchToProps = dispatch => ({
    getBets: () => dispatch(getBets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStatsPage);
