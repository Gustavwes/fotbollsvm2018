import { db } from './firebase';
import React from 'react'
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
    });

export const doGetAllGames = () => 
        db.ref('games');
export const doGetAllGamesTest = () =>
    db.ref('games').once('value');
        



export const onceGetUsers = () =>
    db.ref('users').once('value');