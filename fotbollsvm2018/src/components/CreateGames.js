import React from 'react';
import { db } from '../firebase';

import * as routes from '../constants/routes';

const INITIAL_STATE = {
    matchDay: '',
    date: '',
    time: '',
    teamA: '',
    teamB: '',
    error: null
};
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class CreateMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    // saveToDataBase(e){
    //     e.preventDefault();
    //     const matchDayText = e.target.elements.matchDayInput.value.trim();
    //     const dateInput = e.target.elements.dateInput.value;
    //     const timeInput = e.target.elements.timeInput.value;
    //     const teamAInput = e.target.elements.teamAInput.value;
    //     const teamBInput = e.target.elements.teamBInput.value;

    //     const database = db
    //     db.ref('games/').set({
    //         matchDay: matchDayText,
    //         date: dateInput,
    //         time: timeInput,
    //         teamA: teamAInput,
    //         teamB: teamBInput
    //     });
    //     console.log('Matchday:' + matchDayText)

    // }
    onSubmit = (event) => {
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


        // Create a user in your own accessible Firebase Database too
        db.doCreateGame(matchday, date, time, teamA, teamB)
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
            error
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
                    onChange={event => this.setState(byPropKey('matchday', event.target.value))} ></input>
                <label>Date</label>
                <input
                    value={date}
                    type="date"
                    name="date"
                    onChange={event => this.setState(byPropKey('date', event.target.value))} ></input>
                <label>Time</label>
                <input
                    value={time}
                    type="text"
                    name="time"
                    onChange={event => this.setState(byPropKey('time', event.target.value))} ></input>
                <label>Team A</label>
                <input
                    value={teamA}
                    type="text"
                    name="teamA"
                    onChange={event => this.setState(byPropKey('teamA', event.target.value))} ></input>
                <label>Team B</label>
                <input
                    value={teamB}
                    type="text"
                    name="teamB"
                    onChange={event => this.setState(byPropKey('teamB', event.target.value))} ></input>

                <button disabled={isInvalid} type="submit">Save Game</button>
                {error && <p>{error.message}</p>}
            </form>
        );

    }

}

const CreateGames = () =>
    <div>
        <h1>Create a Game</h1>
        <CreateMatch />
    </div>

export default CreateGames;