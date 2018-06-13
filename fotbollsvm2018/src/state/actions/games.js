import { RSAA } from 'redux-api-middleware';

import * as types from '../constants';


export function getGames() {
    return {
        [RSAA]: {
            endpoint: 'http://api.football-data.org/v1/competitions/467/fixtures',
            headers: { 'X-Auth-Token': 'c4da1e72a9dd46c4a722bd2205b1e0f4', 'X-Response-Control': 'minified' },
            method: 'GET',
            types: [
                types.GET_GAMES_REQUEST,
                types.GET_GAMES_SUCCESS,
                types.GET_GAMES_FAILURE,
            ],
        },
    };
}
