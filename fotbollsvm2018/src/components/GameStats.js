import React, { Fragment } from 'react';

import { Form, Field, reduxForm } from 'redux-form';
import { TextField, List, ListItem, ListItemSecondaryAction, Button, ListSubheader, withStyles } from '@material-ui/core';
import moment from 'moment';
import { connect } from 'react-redux';

import { db, firebase } from '../firebase';
import { getBets } from '../state/actions/bets';
import { getGames } from '../state/actions/games';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

const INITIAL_STATE = {
    teamAResult: '',
    teamBResult: '',
    userId: '',
    gameId: '',
    error: null,
};

class GamesListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.submitBet = this.submitBet.bind(this);
    }

    submitBet = values => {
        console.log(this.props.userId);
        db.doCreateBet(this.props.userId, values);
    }

    render() {
        const { handleSubmit, games, classes } = this.props;
        return (
            <Fragment>
                <Form onSubmit={handleSubmit(this.submitBet)} className={classes.root}>
                    <List>
                        {games.map((game, index) =>
                            (<Fragment>
                        {(index === 0 || index === 16 || index === 32) && <ListSubheader>{`Matchday ${(index + 1) % 15}`}</ListSubheader> }
                        <ListItem key={game.id}>
                                <span>{moment(game.date).format('DD/MM, kk:mm')}</span>
                                <label>{game.homeTeamName ? game.homeTeamName : 'TBD'}</label>
                                <Field
                                    name={`_${game.id}.teamAResult`}
                                    component={({input, ...props}) => <TextField type="number" {...input} {...props}/>}
                                    >
                                </Field>
                                    <label>vs</label>
                                <Field
                                    name={`_${game.id}.teamBResult`}
                                    component={({input, ...props}) => <TextField type="number" {...input} {...props}/>}
                                >
                                </Field>
                                <label>{game.awayTeamName ? game.awayTeamName : 'TBD'}</label>
                                <ListItemSecondaryAction><Button type="submit">Submit</Button></ListItemSecondaryAction>
                            
                        </ListItem>
                        </Fragment>),)}
                    </List>
                </Form>
            </Fragment>
        );
    }
}

class GameStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: null,
            userId: null,
        };
    }

    async componentDidMount() {
        // db.doGetAllGamesTest().then(snapshot =>
        //     this.setState(() => ({ games: snapshot.val() }))
        // );
        await this.props.getGames();
        this.props.games.forEach(game => {
            game.id = game._links.self.href.split('/').slice(-1)[0];
        });
        // const userId = firebase.auth.currentUser.uid;
        // this.setState({ userId });
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ userId: authUser.uid }))
                : this.setState(() => ({ userId: null }));
        });
    }


    render() {
        const { games } = this.props;

        return (
            <Fragment>
                {!!games && <GamesListForm games={games} userId={this.state.userId} {...this.props} />}
            </Fragment>
        );
    }
}


class GameStatsPage extends React.Component {
    componentWillMount() {
        this.props.getBets().then(() => console.log(this.props.initialValues));
    }

    render() {
 return (
        <div>
            <h1>Game Stats</h1>
            <GameStats {...this.props} />
        </div>
    )
; }
}

GameStatsPage = reduxForm({ form: 'gamesListForm', enableReinitialize: true })(withStyles(styles)(GameStatsPage));

const mapStateToProps = state => ({
    initialValues: state.bets.bets,
    games: state.games.games,
});

const mapDispatchToProps = dispatch => ({
    getBets: () => dispatch(getBets()),
    getGames: () => dispatch(getGames()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStatsPage);
