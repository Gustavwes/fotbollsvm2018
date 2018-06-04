import { db } from './firebase';
//User API

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
        teamB
    })

export const onceGetUsers = () =>
    db.ref('users').once('value');