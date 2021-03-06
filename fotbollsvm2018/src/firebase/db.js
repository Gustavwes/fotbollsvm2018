import { db } from './firebase';
// User API

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    });

export const doCreateGame = (id, matchday, date, time, teamA, teamB) =>
    db.ref(`games/${id}`).set({
        matchday,
        date,
        time,
        teamA,
        teamB,
    });

export const doGetAllGames = () =>
    db.ref('games');

export const doCreateBet = (id, values) =>
    db.ref(`bets/${id}`).set(values);
export const doGetAllGamesTest = () =>
    db.ref('games').once('value');
    // db.ref('games').orderByChild('matchday').on("value", function(snapshot) {
    //   });

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const doGetBets = () =>
    db.ref('bets').once('value');

    
