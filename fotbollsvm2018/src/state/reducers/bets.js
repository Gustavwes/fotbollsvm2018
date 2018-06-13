import * as types from '../constants';

export default (
    state = {
        bets: {},
        isWaiting: false,
    },
    action,
) => {
    switch (action.type) {
    case types.START_GET_BETS:
        return {
            ...state,
            isWaiting: true,
        };
    case types.GET_BETS:
        return {
            ...state,
            bets: action.payload,
            isWaiting: false,
        };
    default:
        return state;
    }
};
