import * as types from '../constants';
import { db, firebase } from '../../firebase';

function startGetBets() {
    return {
        type: types.START_GET_BETS,
    };
}

function betsGot(payload) {
    return {
        type: types.GET_BETS,
        payload,
    };
}

export function getBets() {
    return async dispatch => {
        dispatch(startGetBets());
        const bets = await db.doGetBets();

        dispatch(betsGot(bets.val()[firebase.auth.currentUser.uid]));
    };
}
