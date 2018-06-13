import * as types from '../constants';
import { db, firebase } from '../../firebase';


function betsGot(payload) {
    return {
        type: types.GET_BETS,
        payload,
    };
};

export function getBets() {
    return async dispatch => {
        const bets = await db.doGetBets();

        dispatch(betsGot(bets.val()[firebase.auth.currentUser.uid]));
    }
};
