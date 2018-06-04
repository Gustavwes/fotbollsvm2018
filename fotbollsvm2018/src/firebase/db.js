import { db } from './firebase';
//User API

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    });
export const doCreateGame = (matchday, date, time, teamA, teamB) =>
    db.ref(`games`).set({
        matchday,
        date,
        time,
        teamA,
        teamB
    })

export const onceGetUsers = () =>
    db.ref('users').once('value');