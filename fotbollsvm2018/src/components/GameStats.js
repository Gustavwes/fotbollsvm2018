import React, { Fragment } from 'react';
import { db, firebase } from '../firebase';
import { Form, Field, reduxForm } from 'redux-form';
import { TextField, List, ListItem, CircularProgress, ListItemSecondaryAction, Button, ListSubheader, withStyles, Typography, ListItemText } from '@material-ui/core';
import moment from 'moment';
import { connect } from 'react-redux';
import AuthUserContext from './AuthUserContext';
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
    teamA: {
        backgroundColor: 'inherit',
        maxWidth: '200px',
    },
    headline: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    vs: {
        textAlign: 'center',
    },
    numberInput: {
        maxWidth: '20px',
    },
    spinner: {
        display: 'block',
        margin: '0 auto',
    },
    submitBtn: {
        display: 'block',
        margin: '10px auto',
        width: '150px',
        height: '50px',
    },
    teamB: {
        backgroundColor: 'inherit',
        maxWidth: '200px',
        textAlign: 'right',
        paddingRight: 0,
    },
});

class GamesListForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitBet = this.submitBet.bind(this);
    }

    async submitBet(values) {
        const finalValues = {};

        await this.props.getGames();

        Object.keys(values).forEach(key => {
            const { status, matchday } = this.props.games.filter(obj => obj.id === parseInt(key.slice(1), 10))[0];

            if (status === 'IN_PLAY' || status === 'FINISHED') {
                finalValues[key] = this.props.bets[key];
            } else {
                finalValues[key] = { matchday, ...values[key] };
            }
        });

        return db.doCreateBet(this.props.userId, finalValues);
    }

    render() {
        const { handleSubmit, games, classes, waitingForBets, submitting } = this.props;
        console.log(submitting);
        return (
            <AuthUserContext.Consumer>
                { authUser => authUser && !waitingForBets ?
                <Form onSubmit={handleSubmit(this.submitBet)} className={classes.root}>
                    <List>
                        {games.map((game, index) =>
                            (<Fragment key={game.id}>
                                {index === 0 && <ListSubheader>{`Matchday ${(index + 1) % 15}`}</ListSubheader>}
                                {(index === 16 || index === 32) && <Fragment><Button color="primary" variant="contained" className={classes.submitBtn} 
                                        type="submit" disabled={submitting} >{submitting ? "Submitting..." : "Submit"}</Button>
                                        <ListSubheader>{`Matchday ${(index + 1) % 15}`}</ListSubheader></Fragment>}
                                <ListItem>
                                    {/* <ListItemText primary={moment(game.date).format('DD/MM, kk:mm')} /> */}
                                    <ListItemText className={classes.teamA} primary={game.homeTeamName ? game.homeTeamName : 'TBD'} />
                                    <Field
                                        parse={value => Number(value)}
                                        name={`_${game.id}.teamAResult`}
                                        disabled={game.status === 'IN_PLAY' || game.status === 'FINISHED'}
                                        className={classes.numberInput}
                                        component={({ input, ...props }) => <TextField type="tel" {...input} {...props} />}
                                        inputProps={{
                                            maxLength: 2,
                                        }}
                                >
                                    </Field>
                            <ListItemText primary={moment(game.date).format('DD/MM, kk:mm')} secondary="vs" className={classes.vs} />
                                    <Field
                                        parse={value => Number(value)}
                                        name={`_${game.id}.teamBResult`}
                                  disabled={game.status === 'IN_PLAY' || game.status === 'FINISHED'}
                                        className={classes.numberInput}
                                        style={{textAlign: 'right'}}
                                        inputProps={{
                                            maxLength: 2,
                                        }}
                                        component={({ input, ...props }) => <TextField type="tel" {...input} {...props} />}
                                     />
                                    <ListItemText className={classes.teamB}>{game.awayTeamName ? game.awayTeamName : 'TBD'}</ListItemText>
                                    {/* <ListItemSecondaryAction>
                                    <Button
                                        disabled={game.status === 'IN_PLAY' || game.status === 'FINISHED'}
                                        type="submit"
                                        style={
                                            {visibility: game.status === 'IN_PLAY' || game.status === 'FINISHED' ? 'hidden' : 'visible'}
                                        }>Submit</Button>
                                </ListItemSecondaryAction> */}

                                </ListItem>
                            </Fragment>) )}
                            <Button color="primary" variant="contained" className={classes.submitBtn} disabled={submitting}
                                        type="submit">{submitting ? "Submitting..." : "Submit"}</Button>
                    </List>
                            </Form> : <CircularProgress className={classes.spinner}/> }
                </AuthUserContext.Consumer>
        );
    }
}

class GameStatsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
        };
    }

    componentWillMount() {
        this.props.getBets();
        this.props.getGames();
        // const userId = firebase.auth.currentUser.uid;
        // this.setState({ userId });
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ userId: authUser.uid }))
                : this.setState(() => ({ userId: null }));
        });
    }

    render() {
        const { games, classes } = this.props;
        return (
            <div className="container">
                <Typography variant="display3" className={classes.headline}>Game List</Typography>
                {!!games && <GamesListForm games={games} userId={this.state.userId} {...this.props} />}
            </div>
        );

    }
}

GameStatsPage = reduxForm({ form: 'gamesListForm', enableReinitialize: true })(withStyles(styles)(GameStatsPage));

const mapStateToProps = state => ({
    initialValues: state.bets.bets,
    bets: state.bets.bets,
    waitingForBets: state.bets.isWaiting,
    games: state.games.games,
});

const mapDispatchToProps = dispatch => ({
    getBets: () => dispatch(getBets()),
    getGames: () => dispatch(getGames()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStatsPage);
