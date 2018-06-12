import React from 'react';
import { db } from '../firebase';
import uuid from 'uuid/v1';

import * as routes from '../constants/routes';

const INITIAL_STATE = {
    matchDay: '',
    date: '',
    time: '',
    teamA: '',
    teamB: '',
    error: null,
};
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class CreateMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const {
            matchday,
            date,
            time,
            teamA,
            teamB,
        } = this.state;

        const {
            history,
        } = this.props;


        db.doCreateGame(uuid(), matchday, date, time, teamA, teamB)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });


        event.preventDefault();
    }

    render() {
        const {
            matchday,
            date,
            time,
            teamA,
            teamB,
            error,
        } = this.state;
        const isInvalid =
            matchday === '' ||
            date === '' ||
            time === '' ||
            teamA === '' ||
            teamB === '';
        return (
            <form onSubmit={this.onSubmit}>
                <label>Matchday</label>
                <input
                    value={matchday}
                    type="text"
                    name="matchDayInput"
                    onChange={event => this.setState(byPropKey('matchday', event.target.value))}
                />
                <label>Date</label>
                <input
                    value={date}
                    type="date"
                    name="date"
                    onChange={event => this.setState(byPropKey('date', event.target.value))}
                />
                <label>Time</label>
                <input
                    value={time}
                    type="text"
                    name="time"
                    onChange={event => this.setState(byPropKey('time', event.target.value))}
                />
                <label>Team A</label>
                <input
                    value={teamA}
                    type="text"
                    name="teamA"
                    onChange={event => this.setState(byPropKey('teamA', event.target.value))}
                />
                <label>Team B</label>
                <input
                    value={teamB}
                    type="text"
                    name="teamB"
                    onChange={event => this.setState(byPropKey('teamB', event.target.value))}
                />

                <button disabled={isInvalid} type="submit">Save Game</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const CreateGames = () =>
    (<div>
        <h1>Create a Game</h1>
        <CreateMatch />
     </div>);

export default CreateGames;
