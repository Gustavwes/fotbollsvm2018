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

export const doCreateBet = (id, teamAResult, teamBResult, userId, gameId) =>
    db.ref(`bets/${id}`).set({
        teamAResult,
        teamBResult,
        userId,
        gameId
    });
export const doGetAllGamesTest = () =>
     db.ref('games').once('value');
    // db.ref('games').orderByChild('matchday').on("value", function(snapshot) {
    //     snapshot.forEach(function(data) {
    //       console.log("The " + data.key + " dinosaur's score is " + data.val() + data.val().matchday);
    //     });
    //   });

export const onceGetUsers = () =>
    db.ref('users').once('value');

    